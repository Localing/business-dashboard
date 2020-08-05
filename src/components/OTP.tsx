import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;
type OnFocusEvent = React.FocusEvent<HTMLInputElement>;

// Prop type declarations
type SingleOTPProps = {
  initial: number,
  shouldAutoFocus: Boolean,
  shouldFocus: Boolean,
  value: number | string,
  onKeyDown: Function,
  onChange: Function,
  onFocus: Function
}

type OTPProps = {
  numGroups: number,
  numInGroup: number,
  onComplete: Function
}

// Component styles
const SingleOTPInputBox = styled.input`
  margin: 10px;
  padding: 20px;
  width: 60px;
`;

const SingleOTPInput:FunctionComponent<SingleOTPProps> = props => {
  const singleOTPInputEl = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<number|string>('');

  useEffect(() => {
    if(props.shouldAutoFocus && singleOTPInputEl && singleOTPInputEl.current) {
      singleOTPInputEl.current.focus();
    } 
  }, [props.shouldAutoFocus]);

  useEffect(() => {
    if(props.shouldFocus && singleOTPInputEl && singleOTPInputEl.current) {
      singleOTPInputEl.current.focus();
    } 
  }, [props.shouldFocus]);

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  return <>
      <SingleOTPInputBox
        autoComplete="off"
        type={'tel'}
        value={value}
        onChange={(e) => props.onChange(e)}
        onKeyDown={(e) => props.onKeyDown(e)}
        onFocus={(e) => props.onFocus(e)}
        ref={singleOTPInputEl}
      />
  </>
}

const OTPInput:FunctionComponent<OTPProps> = (props) => {
  let initialOTPValue: (number|string)[] = [];
  initialOTPValue.length = props.numGroups * props.numInGroup;

  const [numFocus, setNumFocus] = useState(0);
  const [OTPValue, setOTPValue] = useState(initialOTPValue);


  // Check if number is out of range, if below select first item, if above check for submit event
  useEffect(() => {
    if (numFocus < 0) {
      setNumFocus(0);
    } else if (numFocus >= props.numGroups * props.numInGroup) {
      // If not complete, return to last position
       if (!checkForCompleteOTP()) setNumFocus(props.numGroups * props.numInGroup - 1);
       // Complete - return value
       else props.onComplete(OTPValue.join(''))
    }
  }, [numFocus]);

  const checkInputValue = (val: string): Boolean => {
    if (!isNaN(Number(val)) && val.trim().length === 1) {
      return true;
    }
    return false;
  }

  const changeOneOTPValue = (val: number|string,pos: number) => {
    let inputValueTemp: (number|string)[] = OTPValue;
    inputValueTemp[pos] = val;
    setOTPValue(inputValueTemp);
  }  

  const handleOnChange = (e: OnChangeEvent) => {
    if (checkInputValue(e.target.value)) {
      changeOneOTPValue(Number(e.target.value), numFocus);
      setNumFocus(numFocus + 1);
    } else {
      // Clear the input box
      changeOneOTPValue('', numFocus);
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      changeOneOTPValue('', numFocus);

      setNumFocus(numFocus - 1);

    } else if (e.key === 'Delete') {
      e.preventDefault();
      changeOneOTPValue('', numFocus);

    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setNumFocus(numFocus - 1);

    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setNumFocus(numFocus + 1);

    } else if (
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.key === 'Space'
    ) {
      e.preventDefault();
    }
  }

  const checkForCompleteOTP = (): boolean => {
    // Check if any boxes unfilled
    if (OTPValue.includes('')) return false;

    // Check all items are numbers
    if (isNaN(Number(OTPValue.join('')))) return false;

    // Check number is the correct length
    if (OTPValue.join('').length !== (props.numGroups * props.numInGroup)) return false;

    return true;
  }

  const renderInputs = (): React.ReactChild[] => {
    const inputs: React.ReactChild[] = [];

    // To clear input, set display to ''
    let displayValues: (number|string)[] = OTPValue.map( val => (val === undefined) ? '' : val);

    for (let i = 0; i < props.numGroups; i++) {
      let subInputGroup = []

      for (let j = 0; j < props.numInGroup; j++) {
        subInputGroup.push(
            <SingleOTPInput
            key={j}
            initial={0}
            shouldFocus={numFocus === (i*props.numInGroup + j)}
            shouldAutoFocus={i*props.numInGroup + j === 0}
            value={displayValues[i*props.numInGroup + j]}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            onFocus={(e: OnFocusEvent) => {
              setNumFocus(i*props.numInGroup + j);
              e.target.select();
            }}
          />
        )
      }

      inputs.push(<div key={i}>{subInputGroup}</div>);
      
    }
    return inputs;
  }

  return <>
    <div>
      {renderInputs()}
    </div>
  </>
}

export default OTPInput;