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
        return (<div className="menu-button" onClick={this.handleClick}>
            <section>
                <div className="menu-button-bar"></div>
                <div className="menu-button-bar"></div>
                <div className="menu-button-bar"></div>
            </section>
        </div>)
    }
}
    
