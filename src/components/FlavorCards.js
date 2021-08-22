import React from 'react';
import JavaScriptLogo from "../images/javascript-logo.inline.svg";
import ReactLogo from "../images/react-logo.inline.svg";
import WordPressLogo from "../images/wordpress-logo.inline.svg";
import { Link } from 'gatsby';

export default () => {

    const flavors = [
        {
            name: "Vanilla JS", 
            path: "vanilla",
            logo: JavaScriptLogo
        }, 
        {
            name: "WordPress", 
            path: "wordpress",
            logo: WordPressLogo
        }, 
        {
            name: "React", 
            path: "react",
            logo: ReactLogo
        }
    ];  

    return (
        <div className="text-center">
            <ul className="flex flex-wrap justify-center -mr-12">
                {flavors.map ((flavor, index) => {
                    return (
                        <li className="mb-12 pr-12 flex flex-col w-1/2 md:w-auto text-center last:mb-0">
                            <h4 className="mb-6">{flavor.name}</h4>
                            <div className="w-24 h-24 mx-auto mb-6">
                                <flavor.logo style={{maxWidth: "100%"}}/>
                            </div>
                            <Link to={`/docs/${flavor.path}`} className="text-gray-medium text-base">
                                View the Docs
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
