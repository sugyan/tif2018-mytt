import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// import { selectItem } from '../redux/actions';

interface IRowProps {
    item: any;
}

class Row extends React.Component<IRowProps> {
    public render() {
        const { item } = this.props;
        let content = item.artist;
        if (item.detail) {
            content += ` [${item.detail.replace(/<br>/g, ', ')}]`;
        }
        return (
            <tr>
                <td style={{ whiteSpace: 'nowrap' }}>
                    <div className="checkbox" style={{ marginTop: 0, marginBottom: 0 }}>
                        <label>
                            {/* <input
                                id={this.props.item.id}
                                type="checkbox"
                                checked={this.props.timetable.selected[this.props.item.id] ? true : false}
                                onChange={(e) => this.props.dispatch(selectItem(this.props.item.id, e.target.checked))}
                            /> */}
                            {item.start.format('M/D(ddd) HH:mm')} - {item.end.format('HH:mm')}
                        </label>
                    </div>
                </td>
                <td style={{ backgroundColor: item.color, padding: '4px', width: '100%' }}>
                    <label
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'block',
                            fontWeight: 'normal',
                            marginBottom: 'initial',
                            padding: '4px',
                        }}
                        htmlFor={item.id} >
                        <small>{item.stage}</small>
                        <br />
                        <strong>{content}</strong>
                    </label>
                </td>
            </tr>
        );
    }
}

export const SelectedRow = connect(
    (state) => state,
)(Row);
