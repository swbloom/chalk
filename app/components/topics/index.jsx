import React from 'react';
import { Link , History } from 'react-router';
import Topic from '../topic/index.jsx';
import AuthMixin from '../../services/authMixin.jsx';
import topicData from '../../services/topic.jsx';

export default React.createClass({
	displayName: 'Topics',
	mixins: [AuthMixin, History],
	getInitialState(){
		return {
			topics: [] 
		}
	}, 
	componentWillMount(){
		topicData.getTopics().then(res => {
			console.log(res.topic)
			this.setState({topics: res.topic});
		});
	},
	renderTopics(key, index){
		return <Topic key={index} index={index} details={this.state.topics[index]} />
	},
	render() {
		return (
			<div>
				<Link className="linkBtn" to="dashboard"><button className="primary"><i className="chalk-home"></i>back to dashboard</button></Link>
				<h1>Manage Topics</h1>
				<Link className="linkBtn" to="/topic/new"><button className="success"><i className="chalk-edit"></i>Create New Topic</button></Link>
				<form  className="card" action="">
					<label htmlFor="search">Search</label>
					<input type="search" placeholder="Search for a topic"/>
					<label htmlFor="category">Category</label>
					<select name="category" id="category">
						<option value="html">HTML</option>
						<option value="css">CSS</option>
						<option value="javascript">JavaScript</option>
					</select>
				</form>
				<div>
				{(this.state.topics).map(this.renderTopics)}
				</div>
			</div>
		)
	}
});