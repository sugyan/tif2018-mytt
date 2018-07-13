import React from 'react';
import { connect } from 'react-redux';

interface IFormProps {
    day?: any;
    stage?: any;
    keyword?: any;
}

interface ICheckBox {
    key: string;
    label: string;
}

class Form extends React.Component<IFormProps> {

    private days: ICheckBox[];
    private stages: ICheckBox[];

    constructor(props: any) {
        super(props);
        this.days = [
            { key: '08-03', label: '8/3(金)' },
            { key: '08-04', label: '8/4(土)' },
            { key: '08-05', label: '8/5(日)' },
        ];
        this.stages = [
            { key: 'HOTSTAGE',      label: 'HOT STAGE'       },
            { key: 'SMILEGARDEN',   label: 'SMILE GARDEN'    },
            { key: 'DREAMSTAGE',    label: 'DREAM STAGE'     },
            { key: 'DOLLFACTORY',   label: 'DOLL FACTORY'    },
            { key: 'SKYSTAGE',      label: 'SKY STAGE'       },
            { key: 'FESTIVALSTAGE', label: 'FESTIVAL STAGE'  },
            { key: 'FUJIYOKOSTAGE', label: 'FUJI YOKO STAGE' },
            { key: 'INFOCENTRE',    label: 'INFO CENTRE'     },
        ];
    }
    public render() {
        const { day, stage, keyword } = this.props;
        const days = this.days.map((e, i) => {
            return (
                <div key={i} className="form-check form-check-inline">
                    <label className="form-check-label">
                        <input
                            type="checkbox"
                            checked={day[e.key]}
                            className="form-check-input"
                            // onChange={() => this.props.dispatch(filterToggleCheckbox(e.key))}
                        />
                        {e.label}
                    </label>
                </div>
            );
        });
        const stages = this.stages.map((e, i) => {
            return (
                <div key={i} className="form-check form-check-inline">
                    <label className="form-check-label">
                        <input
                            type="checkbox"
                            checked={stage[e.key]}
                            className="form-check-input"
                            // onChange={() => this.props.dispatch(filterToggleCheckbox(e.key))}
                        />
                        {e.label}
                    </label>
                </div>
            );
        });
        return (
            <form className="form-horizontal" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group row">
                    <label className="col-sm-2 control-label">日付</label>
                    <div className="col-sm-10">{days}</div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 control-label">ステージ</label>
                    <div className="col-sm-10">{stages}</div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 control-label">出演者名</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            value={keyword}
                            // onChange={(e) => this.props.dispatch(filterChangeKeyword(e.target.value))}
                        />
                    </div>
                </div>
            </form>
        );
    }
}
export const FilterForm = connect(
    (state: any) => state.filter,
)(Form);
