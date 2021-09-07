import { useState } from "react";
import { GiTiedScroll, GiScrollUnfurled } from "react-icons/gi"
import { RiArrowDownSFill } from 'react-icons/ri';

interface Props {
  onClick: () => void,
}

const ContentButton = (props: Props) => {
  const { onClick } = props;
  const MIN_WIDTH = 75;
  const MAX_WIDTH = 250;
  const [width, setWidth] = useState(MAX_WIDTH);
  const [open, setOpen] = useState(true);

  const style = {
    width: `${width}px`,
    opacity: open ? 1 : 0,
  }

  const handleOpen = () => {
    setOpen(!open);
    onClick();
  }

  const handleHover = () => {
    if(!open) {
      width === MIN_WIDTH ? setWidth(MAX_WIDTH) : setWidth(MIN_WIDTH);
    }
  }

  return(
    <div onClick={handleOpen} onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <div onClick={handleOpen} className="content-icon">
        { open 
          ? <GiScrollUnfurled />
          : <GiTiedScroll />
        }
      </div>
      <span style={style} className="side-nav-header">
      { width === MIN_WIDTH 
        ? <RiArrowDownSFill /> 
        : <h6>Table of contents</h6>
      }
      </span>
  </div>
  )
}

export default ContentButton;