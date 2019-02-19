// import { IAllPlayersGameScore } from '../../store/game/types'

// export const delay = (fun: Function, time: number) => {
//   return setTimeout(fun, time);
// };

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

// export const updatePlayerScores = (
//   datFromFile: Array<IAllPlayersGameScore>,
//   curId: number
// ) => {
//   let updatedData: IUpdatedData = {
//     current: {
//       id: 1,
//       game: []
//     },
//     all: []
//   };

//   // Populating updatedData.all with data from JSON
//   for (const game of Array.from(datFromFile)) {
//     const { score, extra } = game;

//     // Update scores
//     for (let i = 0; i < score.length; i++) {
//       const curPlayerGameVal: IScores = {
//         score: score[i],
//         extra: extra[i]
//       };

//       updatedData = !(
//         updatedData.all &&
//         updatedData.all[i] &&
//         updatedData.all[i].game
//       )
//         ? {
//             ...updatedData,
//             all: [
//               ...updatedData.all,
//               {
//                 id: i + 1,
//                 game: [curPlayerGameVal]
//               }
//             ]
//           }
//         : {
//             ...updatedData,
//             all: updatedData.all.map(player => {
//               return player.id === i + 1
//                 ? {
//                     id: i + 1,
//                     game: [...updatedData.all[i].game, curPlayerGameVal]
//                   }
//                 : player;
//             })
//           };
//     }
//   }

//   // Assgin current player its data
//   const curPlayerData = updatedData.all.filter(player => player.id === curId);

//   return {
//     ...updatedData,
//     current: curPlayerData[0]
//   };
// };
