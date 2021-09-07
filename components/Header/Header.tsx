import { HiOutlineSearchCircle } from "react-icons/hi";
import _ from 'lodash';

interface Props {
  searchAll: boolean;
  setSearch: (search:string) => void; 
  setSearchAll: (searchAll:boolean) => void;
}

const Header = (props: Props) => {
  const { setSearch, searchAll, setSearchAll } = props;
  const handleSearch = (value:string) => setSearch(value);

  return (
  <header className="glass row mb-4  navbar sticky-top">
    <div className="col">
      <h2>
        Magic the gathering
      </h2>
      <h4 className="navbar-collapse">
        the rulebook
      </h4>
    </div>
    <div className="col input-group align-middle mb-2 mt-3">
      <div>
        <div className="d-flex justify-content-left">
          <div className="col">
            <HiOutlineSearchCircle className="h3 search-icon" />
            <input 
              type="text" 
              className="input form-control bg-transparent"
              onChange={ _.debounce(e => handleSearch(e.target.value), 300)} 
              placeholder="Search" 
              aria-label="Username" 
            />
          </div>
          </div>
          <div className="">
            <div className="form-check form-check-inline text-white">
              <input 
                type="radio" 
                name="searchOptions" id="allRules" 
                value="allRules"
                className="form-check-input" 
                checked={searchAll} 
                onChange={() => setSearchAll(!searchAll)} 
              />
              <label className="form-check-label" htmlFor="allRules">
                All rules
              </label>
            </div>
            <div className="form-check form-check-inline text-white">
              <input className="form-check-input" onChange={() => setSearchAll(!searchAll)} type="radio" name="searchOptions" id="currentPage" value="currentPage"/>
              <label className="form-check-label" htmlFor="currentPage">
                Current page
              </label>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;