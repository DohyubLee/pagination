import React, {Component} from 'react';
import './Container.scss';
import Page from '../Page';

class Container extends Component {
    constructor(props) {
        super(props);
        let exampleItems = [...new Array(100).keys()].map(i => {
            return {
                id: i + 1,
                name: "Item " + (i + 1)
            }
        })
        this.state = {
            exampleItems,
            pageOfItems: [] //현재 페이지에 출력될 리스트
        }
    }

    onChangePage = pageOfItems => {
        this.setState({
            pageOfItems
        });
    };

    render() {
        // console.log("pageOfItems :", this.state.pageOfItems)
        return (
            <div className="container">
                <div className="upper">
                    <h2> Pagination</h2>
                </div>
                <div className="item_list">
                    {this.state.pageOfItems.map(item => (
                        <div key={item.id}> {item.name} </div>
                    ))}
                </div>
                <Page items={this.state.exampleItems} onChangePage={this.onChangePage}/>
            </div>
        );
    }
}

export default Container;