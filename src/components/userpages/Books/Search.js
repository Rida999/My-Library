import React,{useState} from "react";
import { SearchPanel } from "react-search-panel";

const Search = (props) => {
  const {HandleChange,Input}=props;
  const [selectedChoices, setSelectedChoices] = useState("");
  return (
      <SearchPanel
        choices={selectedChoices}
        onChange={HandleChange}
        onSelectionChange={setSelectedChoices}
        placeholder="Search"
        selectedChoices={selectedChoices}
        shadow
        value={Input}
        width={450}
        small
      />
  );
}
export default Search;