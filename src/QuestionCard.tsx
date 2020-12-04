import React, { useState } from "react"
import { QuizQuestion } from "./App"

interface Props {
	questions: QuizQuestion[]
}

const QuestionCard: React.FC<Props> = props => {
	const [questionsAnswered, setQuestionsAnswered] = useState(0)
	const [answer, setAnswer] = useState<{ answer?: string; optionId?: number }>(
		{}
	)
	const [userScore, setUserScore] = useState(0)
	const [isQuizFinished, setIsQuizFinished] = useState(false)
	const [errorClassOptionId, setErrorClassOptionId] = useState<number>()
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
	const [allowNextQuestionButton, setAllowNextQuestionButton] = useState(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!answer.answer || answer.answer.trim().length <= 0) return
		if (answer.answer === props.questions[questionsAnswered].correct_answer) {
			setShowCorrectAnswer(true)
			setUserScore(p => p + 1)
		}
		if (answer.answer !== props.questions[questionsAnswered].correct_answer) {
			setErrorClassOptionId(answer.optionId)
			setShowCorrectAnswer(true)
		}
		setAllowNextQuestionButton(true)
	}

	const handleNextQuiz = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setQuestionsAnswered(p => p + 1)
		setAllowNextQuestionButton(false)
		setShowCorrectAnswer(false)
		setErrorClassOptionId(undefined)
		if (questionsAnswered >= props.questions.length - 1) {
			setIsQuizFinished(true)
		}
		console.log(userScore)
	}

	const handleReTake = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setQuestionsAnswered(0)
		setUserScore(0)
		setIsQuizFinished(false)
	}

	if (isQuizFinished)
		return (
			<div className="shadow d-flex flex-column justify-content-center w-75 bg-light rounded p-4">
				<h1 className="text-dark text-center">Your Result</h1>
				<h4 className="text-center text-secondary">{userScore} / 10</h4>
				<button
					type="button"
					className="d-block btn btn-primary"
					onClick={handleReTake}
				>
					Re take!
				</button>
			</div>
		)

	return (
		<div className="shadow d-flex flex-column justify-content-center w-75 bg-light rounded p-4">
			<h4 className="text-right text-secondary">Q: {questionsAnswered + 1}</h4>
			<h3
				dangerouslySetInnerHTML={{
					__html: props.questions[questionsAnswered].question,
				}}
			/>
			<form onSubmit={handleSubmit}>
				<div className="my-3">
					{props.questions[questionsAnswered].all_answers.map((el, ind) => (
						<div
							key={el}
							className={`form-check ${
								el === props.questions[questionsAnswered].correct_answer &&
								showCorrectAnswer
									? "bg-success"
									: ""
							} ${errorClassOptionId === ind + 1 && "bg-danger"}`}
						>
							<input
								className="form-check-input"
								type="radio"
								name={"option"}
								id={"option_" + (ind + 1)}
								onClick={() => {
									if (el === answer) return
									setAnswer({ answer: el, optionId: ind + 1 })
								}}
							/>
							<label
								dangerouslySetInnerHTML={{ __html: el }}
								className="form-check-label"
								htmlFor={`option_${ind + 1}`}
							/>
						</div>
					))}
				</div>
				<div className="d-flex justify-content-between w-100">
					<button type="submit" className="d-block btn btn-primary">
						Submit
					</button>
					<button
						type="button"
						className="d-block btn btn-primary"
						disabled={!allowNextQuestionButton}
						onClick={handleNextQuiz}
					>
						Next
					</button>
				</div>
			</form>
		</div>
	)
}

export default QuestionCard
