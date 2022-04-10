import PdfViewer from "@/components/PdfViewer";
import SearchResults from "@/components/SearchResults";
import TextDocument from "@/components/TextDocument";
import TopBar from "@/components/Topbar";
import { signOutLocal } from "@/redux/slices/authSlice";
import { getAuth, signOut } from "firebase/auth";
import { nanoid } from "nanoid";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const auth = getAuth();

const HomePage = () => {

    const dispatch = useDispatch();

    return (
        <>
            <TopBar />
            <Link to={'/login'} > Go To Login Page </Link>
            <button onClick={() => { dispatch(signOutLocal()); signOut(auth); }} > Signout </button>
            <div className="flex flex-row justify-between h-full pl-20">
                <TextDocument title={'Class Project 499 Capstone'} author={'Rahul Batra'} tags={[{ id: nanoid(), tagName: 'Research' }]} text={''} />

                <SearchResults />
                <PdfViewer />
            </div>
        </>
    );
}

export default HomePage;