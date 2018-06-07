import React, { Component } from 'react';
import db from '../utils/db';
import User from './User';

export default class UserList extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    users: []
	};

	this.fetchUsers();
	this.listenForChanges();
    }

    fetchUsers() {
	db.find({
	    selector: {
		type: 'kitten'
	    }
	}).then((results) => this.setState({users: results.docs}));
    }

    listenForChanges() {
	db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
	    if (change.doc.type === 'kitten') {
		const newUsers = [];
		this.state.users.map((user, index) => {
		    if (user._id === change.id) {
			if (!change.deleted) {
			    newUsers.push(change.doc);
			}
		    } else {
			newUsers.push(user);
		    }
		});
		
		this.setState({users: newUsers});
	    }
	}).on('error', console.log.bind(console));
    }

    render() {
	return (
	    <div>
	      { this.state.users.map((user, index) => {
		  return (
		      <div key={ user._id }>
			<div>{ user.name }</div>
			<User doc={ user } />
		      </div>
		  );
		  //return <div key={ user._id }>{ user.name }</div>;
	      })}
	    </div>
	);
    }
}
