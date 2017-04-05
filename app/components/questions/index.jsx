import React from 'react';
import { Link, History} from 'react-router';
import AuthMixin from '../../services/authMixin.jsx';
import userData from '../../services/user.jsx';
import questionData from '../../services/questions.jsx';
import QuestionCards from './cards.jsx';
import CodeMirror from 'react-codemirror';
import FilteredSearch from './filteredSearch.jsx';
import CodeArea from './codeArea.jsx';
require('codemirror/mode/javascript/javascript');
import Loading from '../loading/index.jsx';
import Guid from 'guid';

export default class QuestionsContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			questions: {
				categories: ['HTML', 'CSS', 'React', 'JavaScript'],
				difficulties: ['Easy', 'Medium', 'Hard'],
				types: ['Multiple Choice', 'Code']
			},
			question: {
				title: '',
				category: 'HTML',
				description: '',
				difficulty: 'Easy',
				type: 'Multiple Choice',
			},
			multichoice: {
				name: '',
				options: [],
				answer: null
			}
		};
		this.updateQuestion = this.updateQuestion.bind(this);
		this.updateMultichoice = this.updateMultichoice.bind(this);
		this.addMultichoiceOption = this.addMultichoiceOption.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	addQuestion() {
		const { title, category, description, difficulty, type } = this.state.question;
		let question;

		if (title === '' || description === '') {
			alert('Please enter a short description and body for your question.')
			return;
		}

		if (type === 'Multiple Choice') {
			question = Object.assign(this.state.question,{
				multichoice: this.state.multichoice
			});
			console.log(question);
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		this.addQuestion();
	}

	updateQuestion(e) {
		const question = Object.assign({}, this.state.question);
		question[e.target.name] = e.target.value;
		this.setState({
			question
		});
	}

	updateMultichoice(e) {
		const multichoice = Object.assign({}, this.state.multichoice);
		multichoice[e.target.name] = e.target.value;
		this.setState({
			multichoice
		});
	}

	addMultichoiceOption(e) {
		const state = JSON.parse(JSON.stringify(this.state));
		const { multichoice } = state;
		const option = {
			id: Guid.raw(),
			name: multichoice.name
		};
		multichoice.options.push(option);
		this.setState(state);
	}

	render() {
		return (
			<div className='classCard'>
				<h2>Questions</h2>
				<CreateQuestion 
					addMultichoiceOption={this.addMultichoiceOption}
					handleSubmit={this.handleSubmit}
					updateQuestion={this.updateQuestion}
					updateMultichoice={this.updateMultichoice}
					settings={this.state.questions}
					question={this.state.question}
					multichoice={this.state.multichoice} 
				/>
			</div>
		)
	}
}

const CreateQuestion = (props) => {
	const { question, 
			settings,
			handleSubmit,
			updateQuestion,
			updateMultichoice,
			addMultichoiceOption,
			multichoice } = props;
	
	const createDropdown = (name, arr) => {
		return (<select name={name} value={question[name]} onChange={updateQuestion}>
					{arr.map((instance, i) => {
						return <option key={`${name}-${i}`} value={instance}>{instance}</option>
					})}
				</select>)
	}
	
	const showMultichoiceQuestion = () => {
		return (
			<div>
				<div className='fieldRow'>
					Question: {question.description}
					<ul>
						{multichoice.options.map((option, i) => {
							return (<li key={`question-example-${i}`}> 
								<p>{option.name}</p> 
								<i className="fa fa-times"></i>
							</li>)
						})}
					</ul>
				</div>
				<div clasName='fieldRow'>
					<label className='inline largeLabel'>Add an answer</label>
					<input type='text' name='name' onChange={updateMultichoice} />
					<button className='success' onClick={addMultichoiceOption}>Add option</button>				
				</div>
				<div className='fieldRow'>
					<label className='inline largeLabel'>The correct answer is</label>
					<select value={multichoice.options.answer} name='answer' onChange={updateMultichoice}>
						{multichoice.options.length === 0 && <option>No options added</option>}
						{multichoice.options.map((option, i) => <option key={`multichoice-${i}`} value={option.id}>{option.name}</option>)}
					</select>
				</div>
			</div>
		)
	}

	const handleQuestionType = () => {
		if (question.type === 'Multiple Choice') {
			return (<div>
				<h3>Multiple Choice</h3>
				{showMultichoiceQuestion()}
			</div>)
		} else if (question.type === 'Code') {
			return (<div>
				<h3>Code Challenge</h3>
			</div>)
		}
	}

	return (
		<section className='full detailsForm topicsForm card'>
			<h3>Create Question</h3>
			<form onSubmit={handleSubmit}>
				<div className='fieldRow'>
					<label className='inline largeLabel'>Short Description</label>
					<input type="text" placeholder='e.g Map vs. forEach' name="title" value={question.title} onChange={updateQuestion} />
				</div>
				<div className='fieldRow'>
					<label className='inline largeLabel'>Category</label>
					{createDropdown('category', settings.categories)}
				</div>
				<div className='fieldRow'>
					<label className='inline largeLabel'>What is the Question?</label>
					<textarea name='description' className='inline largeLabel' onChange={updateQuestion}>
					</textarea>
				</div>
				<div className='fieldRow'>
					<label className='inline largeLabel'>Level of Difficulty</label>
					{createDropdown('difficulty', settings.difficulties)}
					<label className='inline largeLabel'>Type</label>
					{createDropdown('type', settings.types)}
				</div>
				<div className='typeCard'>
					{handleQuestionType()}
				</div>
				<button className='success'>Submit</button>
			</form>
		</section>
	)
}