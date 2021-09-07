
const Highlight = (text:string, searchParam: string) =>  {
  let searched = searchParam.trim();
  if (searched !== "") {
    let re = new RegExp(searched,"gi");
    let newText:string = text.replace(re, `<mark class="golden">${searched}</mark>`);
    return newText;
  }
}

export default Highlight;