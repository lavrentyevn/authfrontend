# Frontend React Authentication Application

This application has the following functionalities:

## Registration

The user has to type a username and password and confirm it. The sign up button is inactive if nothing is typed. 

<img width="644" alt="Снимок экрана 2023-11-13 в 14 04 47" src="https://github.com/lavrentyevn/authfrontend/assets/111048277/1cbe2006-4dbf-401b-a6e6-0d24ce6bd668">

The registration form also checks what kind of text the user is typing, as it may contain forbidden symbols.

<img width="666" alt="Снимок экрана 2023-11-13 в 14 12 25" src="https://github.com/lavrentyevn/authfrontend/assets/111048277/1b47ba72-04a8-4035-836d-573c6094aaa9">

## Authentication

The user has to type a username and password. React application sends an axios request to a backend api and proceeds to protected components if it gets a success status code.

<img width="650" alt="Снимок экрана 2023-11-13 в 14 04 40" src="https://github.com/lavrentyevn/authfrontend/assets/111048277/3984da24-402b-4926-85e9-1ca269f92186">

The user can tick a "Trust this computer" checkbox, which persists user information. It means that if this user refreshes this page or opens a new tab, he does not have to authenticate again (as long as he has a refresh token, which can be obtained from a backend api when he logs in). This checkbox boolean is stored in localStorage.

<img width="548" alt="Снимок экрана 2023-11-13 в 14 18 11" src="https://github.com/lavrentyevn/authfrontend/assets/111048277/0035cf06-da93-4ed1-8978-e2562eaab054">

Authentication information is stored is a useContext hook. 

## Protected Routes

Protected routes are wrapped in a **PersistLogin** and **RequireAuth** components.

-  PersistLogin <br />
If the user decides to "Trust this computer", then he does not have to log in again as long as he has a refresh token. The refresh token can be used to obtain a new access token.

-  RequireAuth <br />
This component checks if the user is authenticated.

<img width="360" alt="Снимок экрана 2023-11-13 в 14 30 13" src="https://github.com/lavrentyevn/authfrontend/assets/111048277/ec105f3d-f82a-4f52-970a-ef463b9e156c">
