import { useEffect } from 'react';
import { useState } from 'react';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';
import filter from '../helpers/filter';
import NavChapter from './NavChapter';

interface NavProps {
  content: string[],
  setChapter: (value:number) => void,
  open: boolean,
}

type Chapter = {
  title: string,
  rules: string[],
}

type Topic = {
  title: string,
  rules: string[]
}

const SideNav = (props:NavProps) => {
  const { content, setChapter, open } = props;

  const [ filteredRules, setFiltered ] = useState<Topic[]>();
  const [allOpen, setOpen] = useState(true);
  useEffect(() => setFiltered(filter(content, condition, 1)), [content])

  const condition = (item:string) => item.charAt(1) === '.';
  const classNames = `transition ${open ? 'col-3' : ''}`

  const style = {
    marginLeft: '20px',
    opacity: open ? 1 : 0,
    width: open ? '' : 0,
  }

  const openAll = () => setOpen(true);
  const closeAll = () => setOpen(false);

  return(
    <div className={classNames} style={style}>
      <div className="glass">
          <div className="d-flex justify-content-end">
            { allOpen 
            ?
            <div onClick={closeAll} className="close-button">
              <AiFillMinusSquare />
            </div>
            :
            <div onClick={openAll} className="close-button">
              <AiFillPlusSquare />
            </div>
            }
          </div>
          <ul className="side-nav mb-auto justify-content-between">
            { filteredRules && filteredRules.map((item:Chapter) =>
                <NavChapter open={allOpen} setChapter={setChapter} key={item.title} chapter={item} setOpen={setOpen} />
              )
            }
          </ul>
      </div>
    </div>
  )
}

export default SideNav;