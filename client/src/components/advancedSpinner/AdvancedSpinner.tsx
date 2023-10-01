import React from 'react';

interface Props {
  size?: string;
  color?: string;
  spinnerThickness?: string;
  spinnerSpeed?: number;
  spinDirection?: string;
  margin?: string;
}

const DEFAULT_VALUES = {
  size: '30px',
  color: '#1976d2',
  spinnerThickness: '4px',
  spinnerSpeed: 2,
  spinDirection: 'normal',
  margin: '',
};

const AdvancedSpinner = ({
  size = DEFAULT_VALUES.size,
  color = DEFAULT_VALUES.color,
  spinnerThickness = DEFAULT_VALUES.spinnerThickness,
  spinnerSpeed = DEFAULT_VALUES.spinnerSpeed,
  spinDirection = DEFAULT_VALUES.spinDirection,
  margin = DEFAULT_VALUES.margin,
}: Props) => {

  console.log(size);

  interface Styles {
    ldsRing: React.CSSProperties,
    ldsRingDiv: React.CSSProperties
  }



  const keyFrames = `
    @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  `;

  const speed = [1.1, 1.2, 1.3];
  console.log(speed[spinnerSpeed + 1])

  const style: Styles = {
    ldsRing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: `${size}`,
      height: `${size}`
    },
    ldsRingDiv: {
      boxSizing: `border-box`,
      display: `block`,
      position: `absolute`,
      width: `${size}`,
      height: `${size}`,
      margin: `${margin}`,
      border: `${spinnerThickness} solid ${color}`,
      borderRadius: `50%`,
      animation: `lds-ring ${speed[spinnerSpeed]}s cubic-bezier(0.5, 0, 0.5, 1) infinite ${spinDirection}`,
      borderColor: `${color} transparent transparent transparent`,
    },
  };

  const spinDirectionDivArrangement = spinDirection === 'reverse' || spinDirection === 'alternate-reverse' ?
  <>
    <div style={{ ...style.ldsRingDiv, animationDelay: '-0.15s' }}></div>
    <div style={{ ...style.ldsRingDiv, animationDelay: '-0.3s' }}></div>
    <div style={{ ...style.ldsRingDiv, animationDelay: '-0.45s' }}></div>
  </>
  : <>
    <div style={{ ...style.ldsRingDiv, animationDelay: '-0.45s' }}></div>
    <div style={{ ...style.ldsRingDiv, animationDelay: '-0.3s' }}></div>
    <div style={{ ...style.ldsRingDiv, animationDelay: '-0.15s' }}></div>
  </>

  
  

  return (
    <>
      <style>{keyFrames}</style>
      <div
        style={{ ...style.ldsRing }}
      >
        <div style={{ ...style.ldsRingDiv }}></div>
        {spinDirectionDivArrangement}
      </div>
    </>
  );
};

export default AdvancedSpinner;