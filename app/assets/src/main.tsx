import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ja';
import 'whatwg-fetch';

import TimeTable from './timetable';
// import Result from './result';
import reducers from './redux/reducers';
import { updateTimeTable, selectItems, generateResult } from './redux/actions';

interface IMainProps {
    fetchTimeTable(v: any[]): void
}

class Main extends React.Component<IMainProps, {}> {
    componentDidMount() {
        fetch('/api/timetable.json').then((res) => {
            return res.json();
        }).then((json) => {
            const { fetchTimeTable } = this.props;
            fetchTimeTable(json.map((e: any) => {
                e.start = moment(e.start * 1000);
                e.end   = moment(e.end   * 1000);
                e.day   = e.start.format('MM-DD');
                return e;
            }));
        });
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link to="/">
                                    <span className="navbar-brand text-light">TIF 2018 MyTT</span>
                                </Link>
                            </div>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path="/" component={TimeTable} />
                            {/* <Route path="/result" component={Result} />
                            <Route path="/tt/:key" component={Result} /> */}
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const App = connect(
        (state) => state,
        (dispatch) => {
            return {
                fetchTimeTable: (data: any) => {
                    dispatch(updateTimeTable(data));

                    const result: HTMLInputElement = document.getElementById('result') as HTMLInputElement;
                    if (result) {
                        const ids = JSON.parse(result.value);
                        dispatch(selectItems(ids));

                        fetch('/api/generate', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ ids: ids })
                        }).then((response) => {
                            return response.json();
                        }).then((json) => {
                            dispatch(generateResult(json.result));
                        });
                    }
                }
            };
        }
    )(Main);
    ReactDOM.render(
        <Provider store={createStore(reducers)}>
            <App />
        </Provider>,
        document.getElementById('main')
    );
});
