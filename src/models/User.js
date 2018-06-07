import React, { Component } from 'react';
import db from '../utils/db';

export default class User extends Component {
    constructor(props) {
	super(props);

	const { name } = this.props.doc;
	
	this.state = {
	    hasChanged: false,
	    doc: this.props.doc,
	    updatedDoc: {},
	    hasUpdate: false,
	    name: name
	};
    }

    componentWillReceiveProps(nextProps) {
	if (this.state.hasChanged) {
	    this.setState({hasUpdate: true, updatedDoc: nextProps.doc});
	} else {
	    this.setState({doc: nextProps.doc});
	}
    }

    save() {
	db.put(this.state.doc);
	this.setState({ hasChanged: false });
    }

    handleChange(key, event) {
	const { doc } = this.state;

	doc[key] = event.target.value;
	
	this.setState({ doc: doc, hasChanged: true });
    }

    keepChanges() {
	const { doc, updatedDoc } = this.state;

	doc._rev = updatedDoc._rev;

	this.setState({ doc: doc, updatedDoc: {}, hasUpdate: false });
    }

    discardChanges() {
	const { updatedDoc } = this.state;

	this.setState({ doc: updatedDoc, updatedDoc: {}, hasUpdate: false });
    }
    
    render() {
	const hasUpdate = (this.state.hasUpdate ? (
	    <div>This has updates do you want to <button onClick={ e => this.keepChanges() }>keep</button> or <button onClick={ e => this.discardChanges() }>discard</button> your changes</div>
	) : (
	    <button onClick={ event => this.save() }>Save</button>
	));
	
	return (
	    <div>
	      <h3>{ this.state.name }</h3>
	      <input type="text" value={ this.state.doc.name } onChange={ event => this.handleChange('name', event) } />
	      <input type="text" value={ this.state.doc.age || 0 } onChange={ event => this.handleChange('age', event) } />
	      { hasUpdate }
	    </div>
	);
    }
}
