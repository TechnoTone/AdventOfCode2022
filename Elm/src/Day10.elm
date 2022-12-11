module Day10 exposing (part1, part2)

import Bitwise exposing (xor)


part1 : String -> Int
part1 =
    String.lines
        >> toInstructions
        >> processInstructions incrementCycle1 initState1
        >> .total


part2 : String -> List String
part2 =
    String.lines
        >> toInstructions
        >> processInstructions incrementCycle2 initState2
        >> .output
        >> toChunks 40


type Instruction
    = NoOp
    | AddX Int


type alias State1 =
    { cycle : Int
    , x : Int
    , nextToFind : Int
    , total : Int
    }


type alias State2 =
    { cycle : Int
    , x : Int
    , output : String
    }


initState1 : State1
initState1 =
    { cycle = 0
    , x = 1
    , nextToFind = 20
    , total = 0
    }


initState2 : State2
initState2 =
    { cycle = 0
    , x = 1
    , output = ""
    }


toInstructions : List String -> List Instruction
toInstructions =
    List.map toInstruction


toInstruction : String -> Instruction
toInstruction str =
    case String.split " " str of
        [ "noop" ] ->
            NoOp

        [ "addx", x ] ->
            case String.toInt x of
                Just n ->
                    AddX n

                Nothing ->
                    NoOp

        _ ->
            NoOp


processInstructions :
    (Int -> { a | x : Int } -> { a | x : Int })
    -> { a | x : Int }
    -> List Instruction
    -> { a | x : Int }
processInstructions incrementCycleFn state =
    List.foldl (processInstruction incrementCycleFn) state


processInstruction :
    (Int -> { a | x : Int } -> { a | x : Int })
    -> Instruction
    -> { a | x : Int }
    -> { a | x : Int }
processInstruction incrementCycleFn instruction state =
    case instruction of
        NoOp ->
            incrementCycleFn 1 state

        AddX amount ->
            incrementCycleFn 2 state
                |> incrementX amount


incrementX : Int -> { a | x : Int } -> { a | x : Int }
incrementX amount state =
    { state | x = state.x + amount }


incrementTotal : State1 -> State1
incrementTotal ({ x, nextToFind, total } as state) =
    { state
        | nextToFind = nextToFind + 40
        , total = total + x * nextToFind
    }


incrementCycle1 : Int -> State1 -> State1
incrementCycle1 amount state =
    if state.cycle + amount >= state.nextToFind then
        state
            |> incrementTotal
            |> incrementCycle1 amount

    else
        { state | cycle = state.cycle + amount }


incrementCycle2 : Int -> State2 -> State2
incrementCycle2 amount ({ cycle, x, output } as state) =
    if amount == 0 then
        state

    else
        let
            pos =
                cycle |> modBy 40

            suffix =
                if pos >= (x - 1) && pos <= (x + 1) then
                    "#"

                else
                    "."
        in
        incrementCycle2 (amount - 1)
            { state
                | cycle = cycle + 1
                , output = output ++ suffix
            }


toChunks : Int -> String -> List String
toChunks chunkSize str =
    if String.length str <= chunkSize then
        [ str ]

    else
        String.left chunkSize str :: toChunks chunkSize (String.slice chunkSize 999 str)
