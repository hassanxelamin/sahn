export const slideUp = {
    initial: {
        y: 0,
    },
    exit: {
        y: "-100vh",
        transition: {duration: 0.3, delay: 0.02, ease: [0.33, 1, 0.68, 1]}
    }
}


export const height = {
    initial: {
        y: 0
    },
    enter: (i: any) => ({
        y: "-100%",
        transition: {duration: 0.5, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1]}
    }),
    // exit: (i) => ({
    //     height: "100%",
    //     transition: {duration: 0.3, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1]}
    // })
}
