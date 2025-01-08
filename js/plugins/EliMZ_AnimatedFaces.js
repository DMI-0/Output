//==========================================================================
// EliMZ_AnimatedFaces.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderBefore EliMVZ_FaceWindow

@plugindesc ♦5.0.4♦ Animate the face image of the message box.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-animated-faces-for-rpg-maker-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/eli-animated-faces-for-rpg-maker-mz/rate?source=game

• Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Animated faces in the message box.
● Different animations for when the message box is writing and when it is 
not (Idle and Talk animations).

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1bs28UkNeUbhFb_aQxOyrFuIGhpUxgZFC0bDcdqyXGOQ/edit?usp=sharing

============================================================================

@param switchId
@text Disable Switch Id
@type switch
@desc If this switch is on, the face will not animate.
@default 0

@param faceSettings
@text Face Settings
@type struct<faceSettingsSt>[]
@desc Set here all your animated face settings.
@default []

*/

/* --------------------------- FACE IMAGE SETTINGS -------------------------- */
{

/*~struct~faceSettingsSt:

@param image
@text Face image
@type file
@dir img/faces
@desc The image used to be animated.
@default
    
@param startIndex
@text Start Index
@type number
@desc The first index of this animated face.
@default 0

@param middleIndex
@text Idle Index
@type number
@desc The last index of the animated face when message is not writting.
@default 0

@param endIndex
@text Talking Index
@type number
@desc The last index of the animated face when message is writting. Must be equal or higher than Idle.
@default 0

@param frameSpeed
@text Frame Speed
@type number
@desc How fast, in frames, the face will change from start index to endIndex.
@default 30

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_AnimatedFaces = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

/* -------------------------- ANIMATED FACE SPRITE -------------------------- */
class Sprite_AnimatedFace extends Sprite{

    initialize(bitmap){
        super.initialize(bitmap)
        this.initMembers()
        this.setFrame(0, 0, ImageManager.faceWidth, ImageManager.faceHeight)
        this.move(4, 4)
        this.setUpdateVisibilityFunction()
    }

    initMembers(){
        this.frameCount = 0
        this.faceIndex = 0
        this.updateVisibilityFunction = () => undefined
    }

    setUpdateVisibilityFunction(){
        if(Imported.Eli_FaceWindow){
            this.updateVisibilityFunction = this.updateVisibilityWithFaceWindow
        }else{
            this.updateVisibilityFunction = this.updateVisibilityWithoutFaceWindow
        }
    }

    updateVisibilityWithFaceWindow(){
        return Eli.FaceWindow.isFaceWindowDisabled()
    }

    updateVisibilityWithoutFaceWindow(){
        return true
    }

    refreshSettings(){
        this.faceIndex = $gameMessage.faceIndex()
        this.frameCount = 0
    }

    refreshFaceFrame(){
        const faceWidth = ImageManager.faceWidth
        const faceHeight = ImageManager.faceHeight
        const rows = this.bitmap.height / faceWidth
        const cols = this.bitmap.width / faceHeight
        const index = this.faceIndex
        const x = index % cols * faceWidth
        const y = (Math.floor(index / cols) % rows) * faceHeight
    
        this.setFrame(x, y, faceWidth, faceHeight)
    }

    refreshFaceBitmap(){
        const faceName = $gameMessage.faceName()
        const faceIndex = $gameMessage.faceIndex()

        this.refreshSettings()
        this.bitmap = ImageManager.loadFace(faceName)
        this.bitmap.addLoadListener(this.refreshFaceFrame.bind(this))
        Plugin.setFaceSettings(faceName, faceIndex)
    }

    updateAnimation(maxIndex){
        if(this.canUpdateAnimation()){
            this.frameCount++
    
            if(this.canChangeFaceIndex()){
                this.changeFaceIndex(maxIndex)
                this.refreshFaceFrame()
                this.frameCount = 0
            }
        }
    }

    canChangeFaceIndex(){
        return this.frameCount >= Plugin.getFaceSettings().frameSpeed
    }

    changeFaceIndex(limitIndex){
        if(this.faceIndex >= limitIndex){
            this.faceIndex = Plugin.getFaceSettings().startIndex
        }else{
            this.faceIndex += 1
        }
    }

    canUpdateAnimation(){
        return $gameMessage.faceName() && Plugin.isAnimationEnabled()
    }

    update(){
        super.update()
        this.updateVisibility()
    }

    updateVisibility(){
        this.visible = this.updateVisibilityFunction()
    }

}

/* ------------------------------ PLUGIN OBJECT ----------------------------- */
class Parameters {

    constructor(parameters){
        this.switchId = Number(parameters.switchId),
        this.faceSettings = this.createFaceSettings(parameters.faceSettings)
    }

    createFaceSettings(parameters){
        const settings = JSON.parse(parameters)
        const faceSettings = []

        for(const param of settings){
            const settings = JSON.parse(param)

            faceSettings.push({
                image: settings.image,
                startIndex: Number(settings.startIndex),
                middleIndex: Number(settings.middleIndex),
                endIndex: Number(settings.endIndex),
                frameSpeed: Number(settings.frameSpeed),
            })
        }

        return faceSettings
    }
}

Eli.AnimatedFaces = {

    version: 5.04,
    url: "https://hakuenstudio.itch.io/eli-animated-faces-for-rpg-maker-mz",
    Sprite_AnimatedFace: Sprite_AnimatedFace,
    Parameters: Parameters,
    parameters: new Parameters(PluginManager.parameters("EliMZ_AnimatedFaces")),
    alias: {},
    settings: {
        endIndex: 0,
        frameSpeed: Infinity,
        image: "",
        middleIndex: 0,
        startIndex: 0,
    },
    
    initialize(){
        this.initPluginCommands()
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    createEmptyFaceSetting(faceName, faceIndex){
        return {
            endIndex: 0,
            frameSpeed: Infinity,
            image: faceName,
            middleIndex: 0,
            startIndex: faceIndex,
        }
    },

    getFaceSettings(){
        return this.settings
    },

    setFaceSettings(faceName, faceIndex){
        const getSettings = item => item.image === faceName && item.startIndex === faceIndex
        this.settings = this.param().faceSettings.find(getSettings) || 
                        this.createEmptyFaceSetting(faceName, faceIndex)
    },

    isAnimationDisabled(){
        return $gameSwitches.value(this.param().switchId)
    },

    isAnimationEnabled(){
        return !this.isAnimationDisabled()
    }
}

const Plugin = Eli.AnimatedFaces
const Alias = Eli.AnimatedFaces.alias

Plugin.initialize()

Alias.Window_Message_initialize = Window_Message.prototype.initialize
Window_Message.prototype.initialize = function(rect) {
    Alias.Window_Message_initialize.call(this, rect)
    this.createAnimatedFaceSprite()
}

Window_Message.prototype.createAnimatedFaceSprite = function(){
    this.faceSprite = new Sprite_AnimatedFace()
    this.addInnerChild(this.faceSprite)
}

Alias.Window_Message_initMembers = Window_Message.prototype.initMembers 
Window_Message.prototype.initMembers = function() {
    Alias.Window_Message_initMembers.call(this)
    this._faceAnimationState = "idle"
}

Alias.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    if(this.canRefreshFaceSprite()){
        this.refreshFaceSprite()
    }
    Alias.Window_Message_startMessage.call(this)
}

Window_Message.prototype.canRefreshFaceSprite = function() {
    return !!$gameMessage.faceName()
}

Window_Message.prototype.refreshFaceSprite = function() {
    this.getFaceSprite().refreshFaceBitmap()
}

Window_Message.prototype.getFaceSprite = function(){
    return this.faceSprite
}

Alias.Window_Message_updateWait = Window_Message.prototype.updateWait
Window_Message.prototype.updateWait = function() {
    const alias = Alias.Window_Message_updateWait.call(this)

    if(alias){
        this._faceAnimationState = "idle"
    }

    return alias
}

Alias.Window_Message_updateInput = Window_Message.prototype.updateInput
Window_Message.prototype.updateInput = function() {
    const alias = Alias.Window_Message_updateInput.call(this)

    if(alias){
        this._faceAnimationState = "idle"
    }
    
    return alias
}

Alias.Window_Message_loadMessageFace = Window_Message.prototype.loadMessageFace
Window_Message.prototype.loadMessageFace = function() {
    Alias.Window_Message_loadMessageFace.call(this)
    this._faceBitmap = null
    this.refreshFaceSprite()
}

Alias.Window_Message_update = Window_Message.prototype.update
Window_Message.prototype.update = function() {
    Alias.Window_Message_update.call(this)
    this.updateFaceAnimation()
}

Window_Message.prototype.updateFaceAnimation = function() {
    if(this._faceAnimationState === "idle"){
        this.updateIdleFaceAnimation()

    }else if(this._faceAnimationState === "talking"){
        this.updateTalkingFaceAnimation()
    }
}

Window_Message.prototype.updateIdleFaceAnimation = function() {
    this.getFaceSprite().updateAnimation(Plugin.getFaceSettings().middleIndex)
}

Window_Message.prototype.updateTalkingFaceAnimation = function() {
    this.getFaceSprite().updateAnimation(Plugin.getFaceSettings().endIndex)
}

Alias.Window_Message_processCharacter = Window_Message.prototype.processCharacter
Window_Message.prototype.processCharacter = function(textState) {
    Alias.Window_Message_processCharacter.call(this, textState)
    this._faceAnimationState = "talking"
}

}