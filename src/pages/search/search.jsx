import React from "react";

function Search() {
    return(
        <div className="px-4">
            <div className="flex">
                <img className="mr-3" src="Back.svg" />
                <input type="search" placeholder="Search..." className="rounded-lg h-9 bg-light-grey p-4"></input>
            </div>
        </div>
    )
}

export default Search