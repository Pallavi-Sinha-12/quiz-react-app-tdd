import { fireEvent, render} from '@testing-library/react';
import App from './App';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { shallow } from 'enzyme';
import Questions from './Questions';
import QuestionAnswerSection from './components/QuestionAnswerSection/QuestionAnswerSection';


Enzyme.configure({ adapter: new Adapter() });

it("Should render App successfully without crashing", () => {
  const app = shallow(<App />);
  
  expect(app.exists()).toEqual(true);
})

it("Should render QuestionAnswerSection Component", () => {
  const app = shallow(<App />);
  
  expect(app.containsMatchingElement(<QuestionAnswerSection />)).toEqual(true);
})

describe("Testing functionality of App component", () => {

  it("Should display next question when option button of current question is clicked provided the current question is not the last", () => {
    const app = render(<App />);

    const currentQuestionIndex = 0
    const button = app.getByText(Questions[currentQuestionIndex].answerOptions[0].answerLabel);
    fireEvent.click(button);

    expect(app.getByTestId("question-text")).toHaveTextContent(Questions[currentQuestionIndex + 1].questionLabel);
  })

  it("Should display score when option button of last question is clicked", () => {
    const app = render(<App />);

    let expectedScore = 0;
    Questions.forEach ((question) => {
      const option = question.answerOptions[1];
      const optionButton = app.getByText(option.answerLabel);
      fireEvent.click(optionButton);
      if (question.answerOptions[1].isCorrect == true){
        expectedScore += 1;
      }
    })

    expect(app.getByTestId("score-section")).toHaveTextContent("You scored " + expectedScore + " out of " + Questions.length);
    
  })
})