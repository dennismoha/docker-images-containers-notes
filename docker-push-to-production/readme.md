# Things to watch out for when pushing to production
1) Bind mounts shouldn't be used in production
2) containerzied apps <b>might</b> need a` build `step eg react.js
3) multi-container projects might need to be split(or should be split) across multiple hosts/machines
4) trade-offs between control and responsibility might be worth it.