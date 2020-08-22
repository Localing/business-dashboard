import React from 'react';
import styled from 'styled-components';

// Component styles

export const SubpageTracker = styled.div`
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
`;

export const SubpageTrackerDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SubpageCompleted = styled.div`
  color: #007bff;
  font-size: 1.5rem;
`;

export const SubpageUpcoming = styled.div`
  color: #a8d2ff;
  font-size: 1.2rem;
`;

export const SubpageActive = styled.div`
  color: #007bff;
  font-size: 1.2rem;
`;

interface DividerProps {
  active: boolean
}

export const Divider = styled(({ active, ...rest })  => <div {...rest} />)`
  flex-grow: 1;
  height: 2px;
  position: relative;
  background-color: ${(props: DividerProps) => (props.active) ? '#007bff' : '#a8d2ff'};
`;

export const TextRow = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export const StageNum = styled.p`
  font-weight: 600;
  color: #007bff;
  width: 50%;
  display: inline-block;

  margin: 0;
`;

export const StageName = styled.p`
  font-weight: 600;
  color: #343a40;
  text-align: right;
  width: 50%;
  display: inline-block;

  margin: 0;
`;
