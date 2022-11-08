<?php

session_destroy();

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Morpion</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .ctn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: Arial;
            display: flex;
            flex-direction: row;
            gap: 9vw;
        }

        .choice {
            padding: 1em 2em;
            border: 1px solid black;
            border-radius: 1em;
            cursor: pointer;
        }

        .choice h1 {
            text-align: center;
            font-weight: normal;
            margin-bottom: 0.5em;
            font-size: 2em;
            width: max-content;
        }
        
        .choice .img-ctn {
            height: calc(100% - 3em);
            display: flex;
            width: fit-content;
            margin: auto;
        }

        .choice img {
            display: block;
            margin: auto;
        }

        @media screen and (max-width: 700px) {
            .ctn {
                flex-direction: column;
                gap: 5vh;
            }
            
            .choice h1 {
                max-width: 100%;
            }
            
            .choice {
                max-width: 100vw;
            }
        }
    </style>
</head>
<body>
    <div class="ctn">
        <div class="choice" onclick="document.location='.?game=online'">
            <h1>2 joueurs distants</h1>
            <div class="img-ctn">
                <img src="img/online.png" alt="Illustration en ligne">
            </div>
        </div>
        <div class="choice" onclick="document.location='.?game=offline'">
            <h1>2 joueurs 1 écran</h1>
            <div class="img-ctn">
                <img src="img/offline.png" alt="Illustration hors-ligne">
            </div>
        </div>
    </div>
</body>
</html>