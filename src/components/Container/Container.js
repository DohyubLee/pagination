import React, {Component} from 'react';
import './Container.scss';
import Page from '../Page';

class Container extends Component {
    state = {
        exampleItems: [],
        pageOfItems: [] //현재 페이지에 출력될 리스트
    }

    componentDidMount() {
        this.setAPIData()
    }

    setAPIData = async () => {
        let data = await this.callAPIData();
        this.setState({
            exampleItems: data
        })
    }
    callAPIData = () => {
        return fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
    }
    onChangePage = pageOfItems => {
        this.setState({
            pageOfItems
        });
    };

    render() {
        return (
            <div className="container">
                <div className="upper">
                    <h2> Pagination</h2>
                </div>
                <div className="item_list">
                    {this.state.pageOfItems.map(item => (
                        <div key={item.id}> {item.id + " : " + item.name} </div>
                    ))}
                </div>
                <Page items={this.state.exampleItems} onChangePage={this.onChangePage}/>
            </div>
        );
    }
}

export default Container;