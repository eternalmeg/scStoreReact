import React from 'react'
import {Link} from "react-router-dom";



const About = () => (
    <div>
        <div className="fz-inner-page-breadcrumb">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-12">
                        <div className="breadcrumb-txt">
                            <h1>About me</h1>
                            <ul className="fz-inner-page-breadcrumb-nav">
                                <li><Link to="/">Home</Link></li>
                                <li className="current-page">About</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="fz-about-store-area">
            <div className="container">
                <div className="fz-about-single-store">
                    <div className="row gy-3 gy-sm-4 align-items-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="fz-about-store-img">
                                <img src="/assets/images/cat.jpg" alt="House Door Image"/>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6">
                            <div className="fz-about-store-content">
                                <h4 className="fz-about-store-title">About me</h4>
                                <p>Здравейте и добре дошли! Благодаря ви, че отделяте време да научите повече за мен.</p>

                                <p>Казвам се Миглена Тодорова и в момента работя като уеб разработчик. За мен програмирането е много повече от код — то е творчество, логика, непрекъснато учене и възможност да създавам нещо ново и полезно. Обичам предизвикателствата, новите технологии и усещането, когато една идея оживее на екрана.</p>
                                <p>От малка съм запленена от света на технологиите — онова усещане, че чрез компютрите можеш да създаваш, да подобряваш и да решаваш реални проблеми. Тази страст естествено ме доведе до програмирането, което постепенно се превърна не просто в професия, а в мое ежедневие и вдъхновение.</p>
                                <p>Това уеб приложение е част от обучението ми по React и отбелязва важна стъпка в развитието ми като разработчик. То отразява знанията, усилията и стремежа ми да се усъвършенствам в света на уеб технологиите.</p>
                                <p>Благодаря, че посетихте тази страница и проявихте интерес към моята работа!</p>


                                <Link to="/" className="fz-1-banner-btn fz-about-store-btn">Go to home page</Link>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>
)

export default About