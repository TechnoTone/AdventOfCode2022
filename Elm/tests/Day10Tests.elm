module Day10Tests exposing (tests)

import Day10
import Day10Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 10"
        [ test "Part 1 Example" <| always <| Expect.equal 13140 <| Day10.part1 example
        , test "Part 1" <| always <| Expect.equal 14560 <| Day10.part1 input
        , test "Part 2 Example" <| always <| Expect.equal expectedResultForPart2Example <| Day10.part2 example
        , test "Part 2" <| always <| Expect.equal expectedResultForPart2Actual <| Day10.part2 input
        ]


expectedResultForPart2Example : List String
expectedResultForPart2Example =
    [ "##..##..##..##..##..##..##..##..##..##.."
    , "###...###...###...###...###...###...###."
    , "####....####....####....####....####...."
    , "#####.....#####.....#####.....#####....."
    , "######......######......######......####"
    , "#######.......#######.......#######....."
    ]


expectedResultForPart2Actual : List String
expectedResultForPart2Actual =
    [ "####.#..#.###..#..#.####.###..#..#.####."
    , "#....#.#..#..#.#..#.#....#..#.#..#....#."
    , "###..##...#..#.####.###..#..#.#..#...#.."
    , "#....#.#..###..#..#.#....###..#..#..#..."
    , "#....#.#..#.#..#..#.#....#....#..#.#...."
    , "####.#..#.#..#.#..#.####.#.....##..####."
    ]
