import React from 'react';
import { withRouter } from 'react-router';

interface IBottomBavbarProps {
    history: any;
    count: any;
}

class BottomNavbar extends React.Component<IBottomBavbarProps> {
    public handleClick() {
        this.props.history.push('/result');
    }
    public render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-bottom">
                <div className="container-fluid">
                    <div className="navbar-collapse navbar-right">
                        <button className="btn btn-primary navbar-btn" onClick={this.handleClick.bind(this)}>
                            選択中の
                            <strong>{this.props.count}</strong>
                            件でタイムテーブルを生成
                        </button>
                    </div>
                </div>
            </nav>
        );
    }
}
export const RoutingBottomNavbar = withRouter<any>(BottomNavbar);
