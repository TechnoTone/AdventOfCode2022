module Day07 exposing (part1, part2)

import Dict exposing (Dict)


part1 : String -> Int
part1 =
    readTerminal
        >> Dict.values
        >> List.filter (\size -> size < 100000)
        >> List.sum


part2 : String -> Int
part2 input =
    let
        directorySizes =
            readTerminal input

        spaceRequired =
            (Dict.get "/" directorySizes |> Maybe.withDefault 0) - 40000000
    in
    directorySizes
        |> Dict.values
        |> List.filter (\size -> size >= spaceRequired)
        |> List.minimum
        |> Maybe.withDefault 0


readTerminal : String -> Dict String Int
readTerminal =
    String.lines
        >> List.foldl readLine ( Dict.empty, [] )
        >> Tuple.first


readLine : String -> ( Dict String Int, List String ) -> ( Dict String Int, List String )
readLine line ( sizes, path ) =
    case String.words line of
        [ "$", "cd", ".." ] ->
            ( sizes, List.drop 1 path )

        [ "$", "cd", dir ] ->
            ( sizes, dir :: path )

        "$" :: _ ->
            ( sizes, path )

        "dir" :: _ ->
            ( sizes, path )

        [ size, _ ] ->
            let
                sizeInt =
                    String.toInt size |> Maybe.withDefault 0
            in
            ( updateDirectorySizes sizes path sizeInt, path )

        _ ->
            ( sizes, path )


updateDirectorySizes : Dict String Int -> List String -> Int -> Dict String Int
updateDirectorySizes sizes path size =
    case path of
        [] ->
            sizes

        _ :: rest ->
            let
                key =
                    List.reverse path |> String.join "/"

                currentSize =
                    sizes |> Dict.get key |> Maybe.withDefault 0

                newDict =
                    sizes |> Dict.insert key (currentSize + size)
            in
            updateDirectorySizes newDict rest size
