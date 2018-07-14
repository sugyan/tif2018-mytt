import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { generateResult } from '../redux/actions';

// import { generateResult } from './redux/actions';

// interface IProps extends RouteComponentProps<any> {
// }

interface IStateProps {
    timetable: any;
}

interface IDispatchProps {
    onGenerateResult: (data?: string) => void;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<any>;

class Result extends React.Component<IProps, {}> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             url: undefined
//         };
//     }
    public componentDidMount() {
        const { timetable, onGenerateResult } = this.props;
        onGenerateResult();
        if (Object.keys(timetable.selected).length === 0) {
            return;
        }
        fetch('/api/generate', {
            body: JSON.stringify({
                ids: Object.keys(timetable.selected),
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        }).then((response) => {
            return response.json();
        }).then((json) => {
            onGenerateResult(json.result);
        });
    }
//     handleClickTweetButton() {
//         fetch('/api/tweet', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 ids: Object.keys(this.props.timetable.selected)
//             })
//         }).then((response) => {
//             return response.json();
//         }).then((json) => {
//             this.props.history.push('/tt/' + json.key);
//             const url = 'https://twitter.com/intent/tweet?hashtags=アットジャム_MyTT'
//               + '&text=' + encodeURIComponent(`俺のタイテ ${json.url}`)
//               + '&url=' + encodeURIComponent(window.location.href);
//             this.setState({ url: url });
//         });
//     }
    public render() {
        const { timetable } = this.props;
        const result = timetable.result
            ? <img src={timetable.result} style={{ maxWidth: '100%' }} />
            : <div>画像を生成しています...</div>;
//         let button = this.state.url
//             ? <a className="btn btn-primary" href={this.state.url} target="_blank">
//                 Tweetする
//             </a>
//             : <button className="btn btn-info" onClick={this.handleClickTweetButton.bind(this)}>
//                 URLを取得
//             </button>;
        return (
            <div>
                <div>{result}</div>
                {/* <hr />
                <div className="pull-left">
                    <button className="btn btn-default" onClick={() => this.props.history.push('/')}>
                        選び直す
                    </button>
                </div>
                <div className="pull-right">{button}</div> */}
            </div>
        );
    }
}

export default connect(
    (state: any): IStateProps => {
        return {
            timetable: state.timetable,
        };
    },
    (dispatch: Dispatch): IDispatchProps => {
        return {
            onGenerateResult: (data?: string) => dispatch(generateResult(data)),
        };
    },
)(withRouter(Result));
