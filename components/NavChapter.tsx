import { useEffect } from 'react';
import { useState } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';

type Chapter = {
  title: string,
  rules: string[],
}

interface Props {
  open: boolean,
  chapter: Chapter,
  setChapter: (chapter:number) => void,
  setOpen: (open: boolean) => void,
}


const NavChapter = (props:Props) => {
  let style;
  const { chapter, setChapter, open, setOpen } = props;
  const [chapterClosed, setClosed] = useState(!open);
  useEffect(() => setClosed(!open), [open])
  
  const handleClick = (item:string) => {
    const href = item.split(' ')[0];
    const chapterIndex:number = parseInt(item.charAt(0)) - 1;
    
    setChapter(chapterIndex);
    
    const url = location.href;               
    location.href = "#"+href;                 
    history.replaceState(null,'',url); 
  }
  
  const handleClose = () => {
    setClosed(!chapterClosed);
    !chapterClosed ? setOpen(true) : '';
  }

  const animation = {
    height: !chapterClosed ? 0 : '',
    opacity: !chapterClosed ? 0 : 1,
    transition: 'all .5s',
    display: setTimeout(() => chapterClosed ? '' : 'none', chapterClosed ? 0 : 1000)
  }


  return(
    <div>
      <div className="d-flex" style={{ cursor: 'pointer' }}>
        <h6 onClick={handleClose} key={"nav-" + chapter.title}>
          {chapter.title}
        </h6>
        <span onClick={handleClose} style={{ marginLeft: '15px' }}>
          <RiArrowDownSFill />
        </span>
      </div>
      { !chapterClosed &&
        <div className="transition" style={style}>
          { chapter.rules.map(rule => <a onClick={() => handleClick(rule)} key={rule}>{rule}</a>) }
        </div>
      }
    </div>
  )
}

export default NavChapter;