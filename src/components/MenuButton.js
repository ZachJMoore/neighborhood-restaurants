import React, { Component } from "react";

export class MenuButton extends Component {
    constructor(props){
        super(props)
        this.handleClick = ()=>{
            console.log("Menu was clicked")
            this.props.changeNavView()
        }
    }
    render(){
        return (<button className="menu-button flex-container" onClick={this.handleClick} aria-label="toggle navigation menu">
            <section>
                <div className="menu-button-bar"></div>
                <div className="menu-button-bar"></div>
                <div className="menu-button-bar"></div>
            </section>
        </button>)
    }
}
    
