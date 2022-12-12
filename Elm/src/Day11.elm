module Day11 exposing (part1, part2)

import Dict as Dict
import List.Extra as List
import Time exposing (Month(..))


part1 : String -> Int
part1 input =
    input
        |> parseInput
        |> doRounds 20 3


part2 : String -> Int
part2 input =
    input
        |> parseInput
        |> doRounds 10000 1


type alias Monkey =
    { items : List Int
    , operation : Int -> Int
    , test : Int
    , throwTrue : Int
    , throwFalse : Int
    , inspectionCount : Int
    }


doRounds : Int -> Float -> List Monkey -> Int
doRounds rounds inspectionDivisor monkeys =
    if rounds == 0 then
        monkeys
            |> List.map .inspectionCount
            |> List.sortWith (\a b -> compare b a)
            |> List.take 2
            |> List.product

    else
        let
            testMultiplier =
                monkeys |> List.map .test |> List.product

            updateItem : Int -> (Int -> Int) -> Int
            updateItem item opFn =
                ((opFn item |> toFloat) / inspectionDivisor) - 0.5 |> round |> modBy testMultiplier

            doMonkey : Int -> List Monkey -> List Monkey
            doMonkey monkeyIndex monkeyList =
                case List.getAt monkeyIndex monkeyList of
                    Nothing ->
                        monkeyList

                    Just monkey ->
                        let
                            itemCount =
                                List.length monkey.items

                            itemsDictionary =
                                monkey.items
                                    |> List.map
                                        (\item ->
                                            let
                                                newItem =
                                                    updateItem item monkey.operation

                                                destination =
                                                    if (newItem |> modBy monkey.test) == 0 then
                                                        monkey.throwTrue

                                                    else
                                                        monkey.throwFalse
                                            in
                                            ( destination, newItem )
                                        )
                                    |> List.foldl
                                        (\( destination, item ) acc ->
                                            acc
                                                |> Dict.insert
                                                    destination
                                                    ((Dict.get destination acc |> Maybe.withDefault [])
                                                        ++ [ item ]
                                                    )
                                        )
                                        Dict.empty

                            itemsForMonkey : Int -> List Int
                            itemsForMonkey ix =
                                itemsDictionary
                                    |> Dict.get ix
                                    |> Maybe.withDefault []
                        in
                        monkeyList
                            |> List.indexedMap
                                (\ix monkey_ ->
                                    if ix == monkeyIndex then
                                        { monkey_
                                            | inspectionCount = monkey_.inspectionCount + itemCount
                                            , items = []
                                        }

                                    else
                                        { monkey_
                                            | items = monkey_.items ++ itemsForMonkey ix
                                        }
                                )
                            |> doMonkey (monkeyIndex + 1)
        in
        doRounds (rounds - 1)
            inspectionDivisor
            (doMonkey 0 monkeys)


parseInput : String -> List Monkey
parseInput =
    String.lines
        >> List.filter (not << String.isEmpty)
        >> List.groupsOf 6
        >> List.filterMap parseMonkey


parseMonkey : List String -> Maybe Monkey
parseMonkey =
    List.map (String.split ": " >> List.last >> Maybe.withDefault "" >> String.trim)
        >> (\strs ->
                case strs of
                    [ _, itemsStr, opStr, testStr, throwTrueStr, throwFalseStr ] ->
                        Just <|
                            Monkey
                                (itemsStr |> String.split ", " |> List.map strToInt)
                                (getOperation opStr)
                                (lastIntFromStr testStr)
                                (lastIntFromStr throwTrueStr)
                                (lastIntFromStr throwFalseStr)
                                0

                    _ ->
                        Nothing
           )


getOperation : String -> (Int -> Int)
getOperation opStr =
    case String.split " " opStr |> List.drop 3 of
        [ "+", "old" ] ->
            \v -> v + v

        [ "+", v ] ->
            (+) (strToInt v)

        [ "*", "old" ] ->
            \v -> v * v

        [ "*", v ] ->
            (*) (strToInt v)

        _ ->
            identity


strToInt : String -> Int
strToInt =
    String.toInt >> Maybe.withDefault 0


lastIntFromStr : String -> Int
lastIntFromStr =
    String.split " " >> List.last >> Maybe.withDefault "" >> strToInt
