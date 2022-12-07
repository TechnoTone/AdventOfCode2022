module Day05 exposing (part1, part2)

import Array exposing (Array)


part1 : String -> String
part1 =
    readInput
        >> processInstructions CrateMover9000
        >> getStackTops


part2 : String -> String
part2 =
    readInput
        >> processInstructions CrateMover9001
        >> getStackTops


type CrateMover
    = CrateMover9000
    | CrateMover9001


type alias Instruction =
    { quantity : Int
    , from : Int
    , to : Int
    }


readInput : String -> ( Array String, List Instruction )
readInput =
    String.lines
        >> List.foldl
            (\line ( stacks, instructions ) ->
                if String.contains "[" line then
                    ( updateStacks line stacks, instructions )

                else if String.startsWith "move" line then
                    case readInstruction line of
                        Just instruction ->
                            ( stacks, instructions ++ [ instruction ] )

                        Nothing ->
                            ( stacks, instructions )

                else
                    ( stacks, instructions )
            )
            ( Array.initialize 10 (always ""), [] )


updateStacks : String -> Array String -> Array String
updateStacks line =
    Array.indexedMap
        (\i stack ->
            case String.slice (i * 4 + 1) (i * 4 + 2) line of
                "" ->
                    stack

                " " ->
                    stack

                crate ->
                    crate ++ stack
        )


readInstruction : String -> Maybe Instruction
readInstruction input =
    case String.split " " input |> List.filterMap String.toInt of
        [ quantity, from, to ] ->
            Just <| Instruction quantity (from - 1) (to - 1)

        _ ->
            Nothing


processInstructions : CrateMover -> ( Array String, List Instruction ) -> Array String
processInstructions crane ( stacks, instructions ) =
    instructions
        |> List.foldl (processInstruction crane) stacks


processInstruction : CrateMover -> Instruction -> Array String -> Array String
processInstruction crane { quantity, from, to } stacks =
    let
        crates =
            stacks
                |> Array.get from
                |> Maybe.withDefault ""
                |> String.right quantity

        moveTo stack =
            case crane of
                CrateMover9000 ->
                    stack ++ String.reverse crates

                CrateMover9001 ->
                    stack ++ crates
    in
    stacks
        |> Array.indexedMap
            (\i stack ->
                if i == from then
                    String.dropRight quantity stack

                else if i == to then
                    moveTo stack

                else
                    stack
            )


getStackTops : Array String -> String
getStackTops =
    Array.foldl
        (\stack acc ->
            stack
                |> String.right 1
                |> (++) acc
        )
        ""
