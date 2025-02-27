export {keysSetup}

const keysSetup = (keys) => {
    document.addEventListener('keydown', ({ code }) => {
        switch (code) {
            case 'KeyP':
                console.log('Pause');
                break
    
            case 'KeyR':
                console.log('Restart');
                break
    
            case 'Enter':
                console.log('Continue');
                break
    
            case 'KeyA':
            case 'ArrowLeft':
                keys.left = true
                console.log('move Left');
                break
    
            case 'KeyS':
            case 'ArrowRight':
                keys.right = true
                console.log('move Right');
                break
    
            case 'Space':
                console.log('Shoot');
                break
    
            default:
                console.log(code);
                break
    
        }
    })
    document.addEventListener('keyup', ({ code }) => {
        switch (code) {
            case 'KeyP':
                console.log('Pause');
                break
    
            case 'KeyR':
                console.log('Restart');
                break
    
            case 'Enter':
                console.log('Continue');
                break
    
            case 'KeyA':
            case 'ArrowLeft':
                keys.left = false
                console.log('move Left');
                break
    
            case 'KeyS':
            case 'ArrowRight':
                keys.right = false
                console.log('move Right');
                break
    
            case 'Space':
                console.log('Shoot');
                break
    
            default:
                console.log(code);
                break
    
        }
    })
}

