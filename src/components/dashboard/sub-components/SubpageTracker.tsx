import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import * as styles from './styles/SubpageTrackerStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';

interface SubpageTrackerProps {
  stages: {
    number: number,
    name: string
  }[],
  activeStage: number
}

const SubpageTracker:FunctionComponent<SubpageTrackerProps> = ({ stages, activeStage, ...rest }) => {
  

  const generateTracker = () => {
    return stages.map((stage, index) => {
      // Find which object is active (assuming only one is active)
      let rtn_circle, rtn_divider;

      if (index !== activeStage) {
        // Inactive page, check if before or after active
        if (index > activeStage) {
          rtn_circle = <styles.SubpageUpcoming>
            <FontAwesomeIcon icon={farCircle} />
          </styles.SubpageUpcoming>
        } else {
          rtn_circle = <styles.SubpageCompleted>
            <FontAwesomeIcon icon={faCheckCircle} />
          </styles.SubpageCompleted>
        }
      } else {
        rtn_circle = <styles.SubpageActive>
          <FontAwesomeIcon icon={farCircle} />
        </styles.SubpageActive>
      }

      // Add dividers
      if ((index + 1) !== stages.length) {
        if (index >= activeStage) {
          rtn_divider = <styles.Divider active={false} />
        } else {
          rtn_divider = <styles.Divider active={true} />
        }
      }

      return [rtn_circle,rtn_divider];
    });

  }
  
  return <styles.SubpageTracker>
    <styles.SubpageTrackerDots>
      {generateTracker()}
    </styles.SubpageTrackerDots>
    <styles.TextRow>
        <styles.StageNum>
          {`Stage ${String(Math.min(activeStage + 1, stages.length))} of ${String(stages.length)}`}
        </styles.StageNum>
        <styles.StageName>
          {stages[activeStage]?.name ? stages[activeStage].name : 'Completed'}
        </styles.StageName>
      </styles.TextRow>
  </styles.SubpageTracker>
}

export default SubpageTracker;