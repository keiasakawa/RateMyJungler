import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
    mintime: 50
})

export {limiter};