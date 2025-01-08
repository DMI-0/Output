//============================================================================
// EliMZ_ClassPromotion.js
//============================================================================

/*:
@target MZ
@base EliMZ_ClassCurves
@orderAfter EliMZ_CapParameterControl

@plugindesc ♦1.1.5♦ Promote actors to different class and apply bonus!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-class-promotion/rate?source=game

@help 
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================
 
• Apply stats bonus to actors when they change to a different class for 
the first time.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1yvnl8_rWyE3TzX54CY1C89yatqF76oKVuBPtWSemFCM/edit?usp=sharing

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ClassPromotion = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.ClassPromotion = {}

{
const Alias = {}

/* ------------------------------ CLASS CURVES ------------------------------ */
Alias.Eli_ClassCurves_createNewClassHistory = Eli.ClassCurves.createNewClassHistory
Eli.ClassCurves.createNewClassHistory = function(){
    const history = Alias.Eli_ClassCurves_createNewClassHistory.call(this)
    history.isPromoted = false
    return history
}

/* ------------------------------ GAME BATTLER ------------------------------ */
Alias.Game_Battler_initParamHistory = Game_Battler.prototype.initParamHistory
Game_Battler.prototype.initParamHistory = function(classId){
    Alias.Game_Battler_initParamHistory.call(this, classId)
    this.getClassHistory(classId).isPromoted = true
}

Alias.Game_Battler_fillHistoryFirstLevel = Game_Battler.prototype.fillHistoryFirstLevel
Game_Battler.prototype.fillHistoryFirstLevel = function(isCustom, classId){
    if(this.canPromoteClass(classId)){
        this.fillHistoryFirstLevelPromotion(isCustom, classId)
        
    }else{
        Alias.Game_Battler_fillHistoryFirstLevel.call(this, isCustom, classId)
    }
}

Game_Battler.prototype.curveBonus = function(id, isCustom, classId = this._classId){
    const curve = Eli.ClassCurves.getClassCurve(classId, isCustom)
    const param = curve[id]['bonus']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.isMainClass = function(classId = this._classId){
    if(this.isActor()){
        return classId === $dataActors[this._actorId].classId

    }else if(this._classId > 0){
        return classId === Number(this.enemy().meta.ClassId)
    } 
}

Game_Battler.prototype.canPromoteClass = function(classId = this._classId){
    if(this.isActor()){
        return !this.getClassHistory(classId).isPromoted

    }else{
        return this._classId > 0 && !this.getClassHistory(classId).isPromoted && this.enemy().meta.hasOwnProperty("CanPromote")
    }
}

Game_Battler.prototype.fillHistoryFirstLevelPromotion = function(isCustom, classId){
    const history = this.getClassHistoryParams(isCustom, classId)

    for(let i = 0; i < history.length; i++){
        const id = i;
        const currentParam = isCustom ? this.cparamBase(i) : this.paramBase(i)
        const bonus = this.curveBonus(id, isCustom, classId)
        const initialParam = currentParam + bonus
        const level = 1
        history[id][level] = initialParam
    }

    this.getClassHistory(classId).level = 1
}

}