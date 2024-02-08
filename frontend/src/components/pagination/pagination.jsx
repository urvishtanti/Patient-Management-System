import classNames from 'classnames';
import React from 'react';
import './pagination.css';

export function PaginationComponent({
    first,
    last,
    totalPages,
    pageNumber,
    onPageChange
}) {
    const onFirstPage = () => {
        if (first) {
            return;
        }
        onPageChange(0);
    }

    const onLastPage = () => {
        if (last) {
            return;
        }
        onPageChange(totalPages - 1);
    }

    const onPageChangeWrapper = (page) => {
        if (page === pageNumber) {
            return;
        }
        onPageChange(page);
    }

    return (<div className="pagination" style={{ textAlign: 'center' }}>
        <button onClick={(e) => {
            e.preventDefault();
            onFirstPage();
        }}
            className={classNames(first ? "deactive" : "")}>
            <span>&laquo;</span>
        </button>
        {Array.from(Array(totalPages), (e, i) => {
            return <button onClick={(e) => {
                e.preventDefault();
                onPageChangeWrapper(i);
            }} key={`pagination-${i}`}
                className={classNames(i === pageNumber ? "active" : "")}>{i + 1}</button>
        })}
        <button onClick={(e) => {
            e.preventDefault();
            onLastPage();
        }}
            className={classNames(last ? "deactive" : "")}>
            <span>&raquo;</span>
        </button>
    </div>)
}