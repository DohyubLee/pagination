import React, {Component} from 'react';
import './Page.scss';

class Page extends Component {
    state ={
        pager: {
            init: 1
        } //페이징하기위한 데이터
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.items.length !== nextProps.items.length) {
            this.setPage(this.props.initialPage, nextProps);
        }
    }

    // 이동할 페이지 넘버가 인자로 전달됨
    setPage = (page, propsData) => {
        let {items, pageSize} = propsData;
        let pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(items.length, page, pageSize);
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({
            pager: pager
        });
        this.props.onChangePage(pageOfItems);
    }
    getPager = (totalItemsLength, currentPage, pageSize) => {
        let totalPages = Math.ceil(totalItemsLength / pageSize);
        let startPage, endPage; // 화면에 보여질 시작페이지, 끝페이지 넘버
        if (totalPages <= 5) { //전체페이지가 5개 이하일때
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItemsLength - 1);
        let pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);
        return {
            totalItemsLength, //전체 개수
            currentPage, //현재 페이지 넘버
            pageSize,    //출력될 데이터리스트 개수
            totalPages,  //전체 페이지 개수
            startPage,   //페이징 바에서의 첫번째 페이지 넘버
            endPage,     //페이징 바에서의 마지막 페이지 넘버 
            startIndex,  //현재 페이지의 보여지는 첫번째 데이터인덱스
            endIndex,    //현재 페이지의 보여지는 마지막 데이터인덱스
            pages        //페이징바이 출력될 페이지 넘버들
        }
    }

    render() {
        const pager = this.state.pager;
        return (
            <div className="pagination">
                <ul className="pages-box">
                    <li className="page-box" onClick={() => {
                        this.setPage(1, this.props)
                    }}>
                        <a>First</a>
                    </li>
                    <li className="page-box" onClick={() => {
                        this.setPage(pager.currentPage - 1, this.props)
                    }}>
                        <a>Prev</a>
                    </li>
                    {pager.init ? null : pager.pages.map((page, index) => {
                        return (
                            <li className="page-box" key={index} onClick={() => {
                                this.setPage(page, this.props)
                            }}>
                                <a className={pager.currentPage === page ? "active" : ""}>{page}</a>
                            </li>
                        )
                    })}
                    <li className="page-box" onClick={() => {
                        this.setPage(pager.currentPage + 1, this.props)
                    }}>
                        <a>Next</a>
                    </li>
                    <li className="page-box" onClick={() => {
                        this.setPage(pager.totalPages, this.props)
                    }}>
                        <a>Last</a>
                    </li>
                </ul>
            </div>
        );
    }
}

const defaultProps = {
    initialPage: 1,
    pageSize: 6 //페이지 내에 출력될 리스트 개수
};
Page.defaultProps = defaultProps;

export default Page;