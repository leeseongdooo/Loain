import {React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/CharacterSkill.scss";

function CharacterSkill() {

    const NickName = useParams();
    console.log(NickName.searchCharacter);
    async function SKillData() {
        try {

        } catch(Error) {
            console.log(Error);
        }
    }

    useEffect(() => {
        SKillData();
    }, [NickName])
    return (
        <div className="">
            <h3>캐릭터 스킬 창 입니다.</h3>
        </div>
    )
}

export default CharacterSkill;