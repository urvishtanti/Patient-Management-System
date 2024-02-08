package com.medicalassistance.core.security;

import com.medicalassistance.core.common.AuthorityName;
import com.medicalassistance.core.entity.User;
import com.medicalassistance.core.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

@Service
public class JwtTokenUtil {

    @Autowired
    UserRepository userRepository;

    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_ID = "id";
    private static final String CLAIM_KEY_ROLE = "role";

    private static final String CLAIM_KEY_CREATED = "created";
    private static final String CLAIM_KEY_EMAIL_ADDRESS = "emailAddress";
    private Clock clock = DefaultClock.INSTANCE;

    @Value("${jwt.expiration}")
    private Long expiration;

    @Value("${jwt.secret}")
    private String secret;

    private static final String CLAIM_KEY_PASSWORDHASH = "emailAddress";

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        JwtUser jwtUser = (JwtUser) userDetails;
        if (jwtUser != null) {
            claims.put(CLAIM_KEY_ID, jwtUser.getId());
            claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
            claims.put(CLAIM_KEY_ROLE, userDetails.getAuthorities());
            claims.put(CLAIM_KEY_CREATED, new Date());
        }
        return doGenerateToken(claims, userDetails.getUsername());
    }

    public String generatePasswordResetToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        JwtUser jwtUser = (JwtUser) userDetails;
        if (jwtUser != null) {
            claims.put(CLAIM_KEY_ID, jwtUser.getId());
            claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
            claims.put(CLAIM_KEY_PASSWORDHASH,
                    userDetails.getPassword() + "-" + ((JwtUser) userDetails).getLastPasswordResetDate());
        }
        return doGenerateToken(claims, userDetails.getUsername());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate);

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(createdDate)
                .setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    private Date calculateExpirationDate(Date createdDate) {
        return new Date(createdDate.getTime() + expiration * 1000);
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(clock.now());
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
        return (lastPasswordReset != null && created.before(lastPasswordReset));
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        JwtUser user = (JwtUser) userDetails;
        final String username = getUsernameFromToken(token);
        final Date created = getIssuedAtDateFromToken(token);
        // final Date expiration = getExpirationDateFromToken(token);
        return (username.equals(user.getUsername()) && !isTokenExpired(token)
                && !isCreatedBeforeLastPasswordReset(created, user.getLastPasswordResetDate()));
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }


    public String getLoggedInUserID() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getPrincipal().getClass() == String.class) {
            return "";
        }
        JwtUser loggedInUser = (JwtUser) (auth.getPrincipal());
        return loggedInUser.getId();
    }

    public Set<AuthorityName> getLoggedInUserRole() {
        Set<AuthorityName> roles = new HashSet<AuthorityName>();
        String userId = this.getLoggedInUserID();
        if (!Objects.equals(userId, "")) {
            User user = userRepository.findByUserIdAndDeletedFalse(userId);
            if (user != null && user.getAuthorities() != null && user.getAuthorities().size() > 0) {
                roles.addAll(user.getAuthorities());
            }
        }
        return roles;
    }

    public String getLoggedInUserEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        JwtUser loggedInUser = (JwtUser) (auth.getPrincipal());
        return loggedInUser.getUsername();
    }

    public String getPasswordHashFromToken(String token) {
        Claims allClaims = getAllClaimsFromToken(token);
        String rv = allClaims.get(CLAIM_KEY_PASSWORDHASH, String.class);
        return rv;
    }


    public boolean validateResetToken(String token, UserDetails userDetails) {
        JwtUser user = (JwtUser) userDetails;
        final String username = getUsernameFromToken(token);
        final Date created = getIssuedAtDateFromToken(token);
        String getPasswordHash = getPasswordHashFromToken(token);
        String storedExpectedHash =
                userDetails.getPassword() + "-" + ((JwtUser) userDetails).getLastPasswordResetDate();

        // final Date expiration = getExpirationDateFromToken(token);
        return (username.equals(user.getUsername()) && !isTokenExpired(token)
                && !isCreatedBeforeLastPasswordReset(created, user.getLastPasswordResetDate())
                && (getPasswordHash.equals(storedExpectedHash)));
    }

}
