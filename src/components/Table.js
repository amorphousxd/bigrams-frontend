import React from 'react';
import _ from 'lodash';

const TextColumn = ({rowIndex, data, col, ...props}) => (
  <Column {...props}>
    {data}
  </Column>
);

const ActionColumn = ({rowIndex, data, col, ...props}) => (
  <Column {...props}>
    <button className="waves-effect waves-light btn" type="button">wdqqwd</button>
  </Column>
);

const CheckboxColumn = ({rowIndex, action, data, checked, col, ...props}) => (
  <Column {...props}>
		<div onClick={action.bind(null, rowIndex)}>
		<input type="checkbox" readOnly checked={checked}/>
		<label></label>
		</div>
  </Column>
);

export class Table extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
    const { columns, data, selected } = this.props;

		return (
			<table className="bordered">
				<TableHead columns={columns} />
				<TableBody columns={columns} data={data} selected={selected} />
			</table>
		)
	}

}

export class TableHead extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		const data = {};
		this.props.columns.map( (c) => {
			data[c.name] = c.displayName;
		});
		return (
			<thead>
				<Row columns={this.props.columns} data={data} titlesOnly={true} header={true}/>
			</thead>
		)
	}
}

export class TableBody extends React.Component {

	static propTypes = {
		columns: React.PropTypes.array.isRequired,
		data: React.PropTypes.array.isRequired
	}

	constructor(props){
		super(props);
	}

	render(){
		const rows = this.props.data.map( (row, i) => {
			return <Row key={i}
                  index={i}
                  columns={this.props.columns}
                  data={row}
                  selected={this.props.selected} />
		});

		return (
			<tbody>
				{rows}
			</tbody>
		)
	}
}

export class Column extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
    const { header, style, className } = this.props;
    const onClick = this.props.onClick ? this.props.onClick.bind(null, this.props.children) : null;
		return (
        header ?
        <th style={style}>
  			   {this.props.children}
  			</th>
        :
        <td style={style} className={className} onClick={onClick}>
  			   {this.props.children}
  			</td>
		)
	}
}

export class Row extends React.Component {

	static propTypes = {
		columns: React.PropTypes.array.isRequired,
		data: React.PropTypes.object.isRequired
	}

	constructor(props){
		super(props);
	}

	render(){
		const {data, index, titlesOnly, header, style, selected} = this.props;
		const columns = this.props.columns.map( (c, i) => {
			const props = {
        data: data[c.name],
        key: i,
        rowIndex: index,
        header,
        style: c.style,
        className: c.className,
        onClick: c.onClick,
      };
			if(c.customComponent && !titlesOnly){
				return <CheckboxColumn {...props}
                               checked={data.checked}
                               action={c.customComponent.action} />
			}
			return <TextColumn {...props} />
		});
    let className = '';
    if (data.word === selected) className = 'selected';
		return (
			<tr style={style} className={className}>
				{columns}
			</tr>
		)
	}

}
