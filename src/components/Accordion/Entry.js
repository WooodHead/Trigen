import React, { PropTypes } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  margin-bottom: 20px;
  border: 1px solid #e3e3e3;
`;

const Question = styled.div`
  background-color: #e3e3e3;
  padding: 10px;
  cursor: pointer;
`;

const Answer = styled.div`
  padding: 10px;
`;


const Entry = ({ handleExpand, expanded = false, question, answer }) => {
  return (
    <Wrapper>
      <Question onClick={handleExpand}>{question}</Question>
      {
        expanded &&
        <Answer>{answer}</Answer>
      }
    </Wrapper>
  );
};

Entry.propTypes = {
  handleExpand: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  expanded: PropTypes.bool
};

export default Entry;
