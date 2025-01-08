//============================================================================
// EliMZ_EnemyClass.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book
@orderBefore EliMZ_ClassCurves

@plugindesc ♦5.2.0♦ Add class, equips, level and exp to Enemies!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-enemy-class-for-rpg-maker

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/eli-enemy-class-for-rpg-maker/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Requirements
==============================================================================

Need Eli Book 5.4.3

==============================================================================
Features
==============================================================================

● Enemies can have classes!
● Enemies have levels!
● Enemies have Exp!
● Enemies can learn Action Patterns/Skills!

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/1Yh6Tfiq3ZJHnG2E0Pr4ewMdSmMMa5HwJq2Pr9hzQw7E/edit?usp=sharing

==============================================================================

@param equipRules
@text Equip Rules
@type boolean
@desc Choose if you want enemies to follow equip rules.
If not, they will be able to equip everything.
@default false

@param actionPatternMode
@text Action Pattern Mode
@type select
@option Learn and Require Level
@option Require Level
@option Default
@desc If true, the enemy action patterns will be automatically filled with the class skills.
@default true

@param defaultActionRating
@text Default Action Rating
@type number
@desc The default action rating when the skill is not present on the Action Pattern.
@default 5
@parent actionPatternMode

@command cmd_changeLevelByIndex
@text Change Level (Index)
@desc Select an enemy by index and change its level.

    @arg index
    @text Troop index
    @type text
    @desc The enemy index on the troop. Separate each one by comma. -1 for all.
    @default 0
    
    @arg operation
    @text Level Operation
    @type select
    @option up
    @option down
    @option set
    @desc Set will change the enemy level to the number choosed above.
    @default set
    @parent level

    @arg level
    @text Level
    @type text
    @desc The level that will change to.
    @default 1

    @arg recoverAll
    @text Recover All
    @type boolean
    @desc Set this to true if you want to apply a recover all after the level up/down.
    @default true

@command cmd_changeEquipByIndex
@text Change Equip (Index)
@desc Select an enemy by index and change its equipment.

    @arg index
    @text Troop index
    @type text
    @desc The enemy index on the troop. Separate each one by comma. -1 for all.
    @default 0

    @arg isEquipping
    @text Equip or Unequip
    @type boolean
    @on Equip
    @off Unequip
    @desc Choose if you want to add a equipment or remove from the slot.
    @default true

    @arg slotId
    @text Slot Id
    @type text
    @desc The slot id that will be equipped. Start at 0.
    @default 0

    @arg weaponId
    @text Weapon
    @type weapon
    @desc Select the weapon to equip/unequip.
    @default 0

    @arg armorId
    @text Armor
    @type armor
    @desc Select the armor to equip/unequip.
    @default 0

@command cmd_changeClassByIndex
@text Change Class (Index)
@desc Select an enemy by index and change its class.

    @arg index
    @text Troop index
    @type text
    @desc The enemy index on the troop. Separate each one by comma. -1 for all.
    @default 0

    @arg classId
    @text Class Id
    @type class
    @desc The new class id for the enemy.
    @default 0

@command cmd_changeLevelById
@text Change Level (Id)
@desc Select an enemy by id and change its level.

    @arg enemyId
    @text Enemy Id
    @type enemy
    @desc The enemy id to change the level.
    @default 0

    @arg isForAll
    @text Is For All
    @type boolean
    @desc If true, the command will be valid for all enemies with the specified Id. Otherwise, only for one.
    @default false
    @parent id
    
    @arg operation
    @text Level Operation
    @type select
    @option up
    @option down
    @option set
    @desc Set will change the enemy level to the number choosed above.
    @default set
    @parent level

    @arg level
    @text Level
    @type text
    @desc The level that will change.
    @default 1

    @arg recoverAll
    @text Recover All
    @type boolean
    @desc Set this to true if you want to apply a recover all after the level up/down.
    @default true

@command cmd_changeEquipById
@text Change Equip (Id)
@desc Select an enemy by id and change its equipment.

    @arg enemyId
    @text Enemy Id
    @type enemy
    @desc The enemy id to change the level.
    @default 0

    @arg isForAll
    @text Is For All
    @type boolean
    @desc If true, the command will be valid for all enemies with the specified Id.
    @default false
    @parent id

    @arg isEquipping
    @text Equip or Unequip
    @type boolean
    @on Equip
    @off Unequip
    @desc Choose if you want to add a equipment or remove from the slot.
    @default true

    @arg slotId
    @text Slot Id
    @type text
    @desc The slot id that will be equipped. Start at 0.
    @default 0
    @parent isEquipping

    @arg weaponId
    @text Weapon
    @type weapon
    @desc Select the weapon to equip/unequip.
    @default 0
    @parent isEquipping

    @arg armorId
    @text Armor
    @type armor
    @desc Select the armor to equip/unequip.
    @default 0
    @parent isEquipping

@command cmd_changeClassById
@text Change Class (Id)
@desc Select an enemy by id and change its class.

    @arg enemyId
    @text Enemy Id
    @type enemy
    @desc The enemy id to change the level.
    @default 0

    @arg isForAll
    @text Is For All
    @type boolean
    @desc If true, the command will be valid for all enemies with the specified Id.
    @default false
    @parent id

    @arg classId
    @text Class Id
    @type class
    @desc The new class id for the enemy.
    @default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_EnemyClass = true

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */
{
    const pluginName = "Eli Enemy Class"
    const requiredVersion = 5.43
    const messageVersion = "5.4.3"
    
    if(!Eli.Book && !window.BookAlert){
        window.BookAlert = true
        const msg = `${pluginName}:\nYou are missing the core plugin: Eli Book.\nPlease, click ok to download it now.`
        if(window.confirm(msg)){
            nw.Shell.openExternal("https://hakuenstudio.itch.io/eli-book-rpg-maker-mv-mz")
        }
    
    }else if(Eli.Book.version < requiredVersion && !window.BookAlert){
        window.BookAlert = true
        const msg = `${pluginName}:\nYou need Eli Book version ${messageVersion} or higher.\nPlease, click ok to download it now.`
        if(window.confirm(msg)){
            nw.Shell.openExternal("https://hakuenstudio.itch.io/eli-book-rpg-maker-mv-mz")
        }
    }
    
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.EnemyClass = {

    version: 5.20,
    url: "https://hakuenstudio.itch.io/eli-enemy-class-for-rpg-maker",
    parameters: {
        equipRules: false,
        actionPatternMode: "",
        defaultActionRating: 5,
    },
    alias: {},
    enemyAction: null,
    processDataEnemies: () => {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.addLevelPropertyToEnemy()
        this.setCallbackForDataChange()
    },

    initParameters(){
        const parameters = PluginManager.parameters("EliMZ_EnemyClass")
        this.parameters.equipRules = parameters.equipRules === "true"
        this.parameters.actionPatternMode = parameters.actionPatternMode
        this.parameters.defaultActionRating = Number(parameters.defaultActionRating)
    },

    initPluginCommands(){
        const commands = [
            'cmd_changeLevelByIndex', 'cmd_changeEquipByIndex', 'cmd_changeClassByIndex', 
            'cmd_changeLevelById', 'cmd_changeEquipById', 'cmd_changeClassById'
        ]
        Eli.PluginManager.registerCommands(this, commands)
    },

    addLevelPropertyToEnemy(){
        Object.defineProperty(Game_Enemy.prototype, 'level', {
            get: function() {
                return this._level
            },
            configurable: true
        })
    },

    setCallbackForDataChange(){
        const callback = {
            "Learn and Require Level": this.addActionPatternsToDataEnemy.bind(this),
            "Require Level": this.setLevelForActionPatterns.bind(this),
        }[this.param().actionPatternMode]

        if(callback){

            this.processDataEnemies = (data) => {
                if(this.dataEnemyHasClassId(data)){
                    callback(data)
                }
            }
        }
    },

    dataEnemyHasClassId(data){
        return data.meta.hasOwnProperty("ClassId")
    },

    addActionPatternsToDataEnemy(data){
        const currentClass = $dataClasses[Number(data.meta.ClassId)]

        for(const learning of currentClass.learnings){
            const skillId = learning.skillId
            const level = learning.level
            const action = data.actions.find(action => action.skillId === skillId)
        
            if(action){
                action.requiredLevel = level

            }else{
                const actionRating = this.param().defaultActionRating
                const newAction = this.createActionPattern(skillId, actionRating, level)
                data.actions.push(newAction)
            }
        }
    },

    createActionPattern(skillId, actionRating, level){
        return {
            conditionParam1: 0,
            conditionParam2: 0,
            conditionType: 0,
            rating: actionRating,
            skillId: skillId,
            requiredLevel: level,
        }
    },

    setLevelForActionPatterns(data){
        const currentClass = $dataClasses[Number(data.meta.ClassId)]

        for(const action of data.actions){
            const learning = currentClass.learnings.find(learning => learning.skillId === action.skillId)
            action.requiredLevel = learning ? learning.level : 0
        }
    },

    cmd_changeLevelByIndex(args){
        const level = Math.abs(Number(args.level))
        const indexList = this.createIndexList(args.index)
        const recoverAll = args.recoverAll === "true"

        for(const index of indexList){
            const member = $gameTroop.members()[index]

            if(member && member.isAlive()){
                this.processLevelChange(args.operation, member, level)

                if(recoverAll){
                    member.recoverAll()
                }
            }
        }
    },

    createIndexList(indexString){
        if(indexString.includes('-1')){
            return Array.from({length: $gameTroop.members().length}, (_, i) => i)
        }else{
            return indexString.split(',').map(item => Number(item))
        }
    },

    processLevelChange(operation, member, level){
        const value = {
            up: member._level + level,
            down: member._level - level,
            set: level,
        }

        member.changeLevel(value[operation])
    },

    cmd_changeLevelById(args){
        const level = Math.abs(Number(args.level))
        const targetId = Number(args.enemyId)
        const isForAll = args.isForAll === 'true'
        const recoverAll = args.recoverAll === "true"

        const enemyTroop = $gameTroop.members()
        const getEnemy = member => member.enemyId() === targetId
        const targetEnemies = isForAll ? enemyTroop : [enemyTroop.find(getEnemy)]

        for(const enemy of targetEnemies){
            if(enemy.isAlive()){
                this.processLevelChange(args.operation, enemy, level)

                if(recoverAll){
                    enemy.recoverAll()
                }
            }
        }
    },

    cmd_changeEquipByIndex(args){
        const indexList = this.createIndexList(args.index)
        const slotId = Number(args.slotId)
        const isEquipping = args.isEquipping === 'true'

        const weapon = $dataWeapons[Number(args.weaponId)]
        const armor = $dataArmors[Number(args.armorId)]
        const item = isEquipping ? weapon || armor : null

        for(const index of indexList){
            const member = $gameTroop.members()[index]
            member.forceChangeEquip(slotId, item)
        }

    },

    cmd_changeEquipById(args){
        const targetId = Number(args.enemyId)
        const slotId = Number(args.slotId)

        const isForAll = args.isForAll === 'true'
        const isEquipping = args.isEquipping === 'true'

        const weapon = $dataWeapons[Number(args.weaponId)]
        const armor = $dataArmors[Number(args.armorId)]
        const item = isEquipping ? weapon || armor : null

        const enemyTroop = $gameTroop.members()
        const getEnemy = member => member.enemyId() === targetId
        const targetEnemies = isForAll ? enemyTroop : [enemyTroop.find(getEnemy)]

        for(const enemy of targetEnemies){
            if(enemy.isAlive()){
                enemy.forceChangeEquip(slotId, item)
            }
        }

    },

    cmd_changeClassByIndex(args){
        const indexList = this.createIndexList(args.index)
        const classId = Number(args.classId)

        for(const index of indexList){
            const enemy = $gameTroop.members()[index]
            enemy.changeClass(classId, false)
        }
    },

    cmd_changeClassById(args){
        const targetId = Number(args.enemyId)
        const classId = Number(args.classId)
        const isForAll = args.isForAll === 'true'

        const enemyTroop = $gameTroop.members()
        const getEnemy = member => member.enemyId() === targetId
        const targetEnemies = isForAll ? enemyTroop : [enemyTroop.find(getEnemy)]

        for(const enemy of targetEnemies){
            if(enemy.isAlive()){
                enemy.changeClass(classId, false)
            }
        }
    },

    param(){
        return this.parameters
    },

    needChangeDataEnemies(){
        return  this.param().actionPatternMode === "Learn and Require Level" || 
                this.param().actionPatternMode === "Require Level"
    },

}

const Plugin = Eli.EnemyClass
const Alias = Eli.EnemyClass.alias

Plugin.initialize()

/* ------------------------------- SCENE BOOT ------------------------------- */

Alias.Scene_Boot_processDataEnemies = Scene_Boot.prototype.processDataEnemies
Scene_Boot.prototype.processDataEnemies = function(data){
    Alias.Scene_Boot_processDataEnemies.call(this, data)
    Plugin.processDataEnemies(data)
}

/* ------------------------------- GAME ENEMY ------------------------------- */
{

Alias.Game_Enemy_initMembers = Game_Enemy.prototype.initMembers
Game_Enemy.prototype.initMembers = function() {
    Alias.Game_Enemy_initMembers.call(this)
    this.initClassMembers()
}

Alias.Game_Enemy_setup = Game_Enemy.prototype.setup
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Alias.Game_Enemy_setup.call(this, enemyId, x, y)
    this.setupClass()
}

Alias.Game_Enemy_traitObjects = Game_Enemy.prototype.traitObjects
Game_Enemy.prototype.traitObjects = function() {
    if(this._classId > 0){
        let objects = Game_Battler.prototype.traitObjects.call(this)
        objects = objects.concat([this.enemy(), this.currentClass()])
        const equips = this.equips()

        for(const equip of equips){
            if(equip) {
                objects.push(equip)
            }
        }

        return objects
    }else{
        return Alias.Game_Enemy_traitObjects.call(this)
    }
}

Alias.Game_Enemy_paramBase = Game_Enemy.prototype.paramBase
Game_Enemy.prototype.paramBase = function(paramId) {
    if(this._classId > 0){
        return this.getParamBaseFromClass(paramId)
    }else{
        return Alias.Game_Enemy_paramBase.call(this, paramId)
    }
}

Alias.Game_Enemy_paramPlus = Game_Enemy.prototype.paramPlus
Game_Enemy.prototype.paramPlus = function(paramId) {
    let value = Alias.Game_Enemy_paramPlus.call(this, paramId)

    if(this._classId > 0){
        value += this.getParamPlusFromEquip(paramId)
    }

    return value
}

Game_Enemy.prototype.initClassMembers = function() {
    this._level = 0
    this._initialLevel = 0
    this._classId = 0
    this._exp = {}
    this._equips = []
}

Game_Enemy.prototype.setupClass = function() {
    const meta = this.enemy().meta
    this._initialLevel = Number(meta.InitialLevel) || 1
    this._maxLevel = Number(meta.MaxLevel) || 99
    this._level = 1
    this._classId = Number(meta.ClassId) || 0
    
    if(this._classId > 0){
        this.initExp()
    }
    // Compatibility with Class Curves
    if(!Imported.Eli_ClassCurves){
        if(this._initialLevel > 1){
            this.changeLevel(this._initialLevel)
        }
        this.recoverAll()
    }

    this.initEquips() 
}

Game_Enemy.prototype.expForLevel = function(level) {
    const [basis, extra, acc_a, acc_b] = this.currentClass().expParams

    return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            (level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra)
}

Game_Enemy.prototype.initExp = function() {
    this._exp[this._classId] = this.currentLevelExp()
}

Game_Enemy.prototype.currentExp = function() {
    return this._exp[this._classId]
}

Game_Enemy.prototype.currentLevelExp = function() {
    return this.expForLevel(this._level)
}

Game_Enemy.prototype.nextLevelExp = function() {
    return this.expForLevel(this._level + 1)
}

Game_Enemy.prototype.nextRequiredExp = function() {
    return this.nextLevelExp() - this.currentExp()
}

Game_Enemy.prototype.maxLevel = function() {
    return this._maxLevel
}

Game_Enemy.prototype.isMaxLevel = function() {
    return this._level >= this.maxLevel()
}

Game_Enemy.prototype.initEquips = function() {
    const slots = this.equipSlots()
    const maxSlots = slots.length
    const equips = this.getInitialEquipsFromMeta()
    this._equips = []

    for (let i = 0; i < maxSlots; i++) {
        this._equips[i] = new Game_Item()
    }

    for (let i = 0, l = equips.length; i < l; i++) {
        if (i < maxSlots) {
            this._equips[i].setEquip(slots[i] === 1, equips[i])
        }
    }

    this.releaseUnequippableItems(true)
    this.recoverAll()
    this.refresh()
}

Game_Enemy.prototype.getInitialEquipsFromMeta = function(){
    const meta = this.enemy().meta
    const maxSlots = this.equipSlots().length
    const equipSlots = new Array(maxSlots).fill(0)

    if(meta.Equips){
        const initialEquips = meta.Equips.split(",")

        for(const equipSettings of initialEquips){
            const [slotId, equipId] = equipSettings.split(":").map(item => Number(item))
            equipSlots[slotId - 1] = equipId
        }

    }
    // const setInitialEquips = (equipSettings) => {
    //     const [slotId, equipId] = equipSettings.split(":").map(item => Number(item))
    //     equipSlots[slotId - 1] = equipId
    // }
    // for(const equip of initialEquips){
    //     const [slotId, equipId] = equipId.split(":").map(item => Number(item))
    //     equipSlots[slotId - 1] = equipId
    // }
    //initialEquips.forEach(setInitialEquips)

    return equipSlots
}

Game_Enemy.prototype.equipSlots = function() {
    const slots = []

    for (let i = 1, l = $dataSystem.equipTypes.length; i < l; i++) {
        slots.push(i)
    }

    if (slots.length >= 2 && this.isDualWield()) {
        slots[1] = 1
    }

    return slots
}

Game_Enemy.prototype.equips = function() {
    return this._equips.map(item => {
        return item.object()
    })
}

Game_Enemy.prototype.weapons = function() {
    return this.equips().filter(item =>  {
        return item && DataManager.isWeapon(item)
    })
}

Game_Enemy.prototype.armors = function() {
    return this.equips().filter(item =>  {
        return item && DataManager.isArmor(item)
    })
}

Game_Enemy.prototype.hasWeapon = function(weapon) {
    return this.weapons().includes(weapon)
}

Game_Enemy.prototype.hasArmor = function(armor) {
    return this.armors().includes(armor)
}

Game_Enemy.prototype.isEquipChangeOk = function(slotId) {
    if(Plugin.param().equipRules){
        return (!this.isEquipTypeLocked(this.equipSlots()[slotId]) &&
                !this.isEquipTypeSealed(this.equipSlots()[slotId]))
    }else{
        return true
    }
}

Game_Enemy.prototype.changeEquip = function(slotId, item) {
    if (!item || this.equipSlots()[slotId] === item.etypeId) {
        this._equips[slotId].setObject(item)
        this.refresh()
    }
}

Game_Enemy.prototype.forceChangeEquip = function(slotId, item) {
    this._equips[slotId].setObject(item)
    this.releaseUnequippableItems(true)
    this.refresh()
}

Game_Enemy.prototype.changeEquipById = function(etypeId, itemId) {
    const slotId = etypeId - 1
    if (this.equipSlots()[slotId] === 1) {
        this.changeEquip(slotId, $dataWeapons[itemId])
    } else {
        this.changeEquip(slotId, $dataArmors[itemId])
    }
}

Game_Enemy.prototype.isEquipped = function(item) {
    return this.equips().includes(item)
}

Game_Enemy.prototype.discardEquip = function(item) {
    const slotId = this.equips().indexOf(item)
    if (slotId > -1) {
        this._equips[slotId].setObject(null)
    }
}

Game_Enemy.prototype.releaseUnequippableItems = function(forcing) {
    if(Plugin.param().equipRules){
        for (;;) {
            const slots = this.equipSlots()
            const equips = this.equips()
            let changed = false
            for (let i = 0; i < equips.length; i++) {
                const item = equips[i];
                if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
                    // if (!forcing) {
                    //     this.tradeItemWithParty(null, item);
                    // }
                    this._equips[i].setObject(null)
                    changed = true
                }
            }
            if (!changed) {
                break
            }
        }
    }
}

Game_Enemy.prototype.clearEquipments = function() {
    const maxSlots = this.equipSlots().length

    for (let i = 0; i < maxSlots; i++) {
        if (this.isEquipChangeOk(i)) {
            this.changeEquip(i, null)
        }
    }
}

Game_Enemy.prototype.isSkillWtypeOk = function(skill) {
    const wtypeId1 = skill.requiredWtypeId1
    const wtypeId2 = skill.requiredWtypeId2
    if (
        (wtypeId1 === 0 && wtypeId2 === 0) ||
        (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1)) ||
        (wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2))
    ) {
        return true
    } else {
        return false
    }
}

Game_Enemy.prototype.isWtypeEquipped = function(wtypeId) {
    return this.weapons().some(weapon => {
        return weapon.wtypeId === wtypeId
    })
}

Game_Enemy.prototype.refresh = function() {
    this.releaseUnequippableItems(false)
    Game_Battler.prototype.refresh.call(this)
}

Game_Enemy.prototype.currentClass = function() {
    return $dataClasses[this._classId]
}

Game_Enemy.prototype.isClass = function(gameClass) {
    return gameClass && this._classId === gameClass.id
}

Game_Enemy.prototype.attackElements = function() {
    const set = Game_Battler.prototype.attackElements.call(this)
    if (this.hasNoWeapons() && !set.includes(this.bareHandsElementId())) {
        set.push(this.bareHandsElementId())
    }
    return set
}

Game_Enemy.prototype.hasNoWeapons = function() {
    return this.weapons().length === 0
}

Game_Enemy.prototype.bareHandsElementId = function() {
    return 1
}

Game_Enemy.prototype.getParamBaseFromClass = function(paramId) {
    return this.currentClass().params[paramId][this._level]
}

Game_Enemy.prototype.getParamPlusFromEquip = function(paramId){
    const equips = this.equips()
    let value = 0

    for(const equip of equips){
        if(equip){
            value += equip.params[paramId]
        }
    }

    return value
}

Game_Enemy.prototype.attackAnimationId1 = function() {
    if (this.hasNoWeapons()) {
        return this.bareHandsAnimationId()
    } else {
        const weapons = this.weapons()
        return weapons[0] ? weapons[0].animationId : 0
    }
}

Game_Enemy.prototype.attackAnimationId2 = function() {
    const weapons = this.weapons()
    return weapons[1] ? weapons[1].animationId : 0
}

Game_Enemy.prototype.bareHandsAnimationId = function() {
    return 1
}

Game_Enemy.prototype.changeExp = function(exp, show) {
    this._exp[this._classId] = Math.max(exp, 0)

    while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
        this.levelUp()
    }
    while (this.currentExp() < this.currentLevelExp()) {
        this.levelDown()
    }
    this.refresh()
}

Game_Enemy.prototype.levelUp = function() {
    this._level++
    // this.currentClass().learnings.forEach(function(learning) {
    //     if (learning.level === this._level) {
    //         this.learnSkill(learning.skillId);
    //     }
    // }, this);
}

Game_Enemy.prototype.levelDown = function() {
    this._level--
}

Game_Enemy.prototype.displayLevelUp = function() {
    const text = TextManager.levelUp.format(this._name, TextManager.level, this._level)
    $gameMessage.newPage()
    $gameMessage.add(text)
}

Game_Enemy.prototype.gainExp = function(exp) {
    const newExp = this.currentExp() + Math.round(exp * this.finalExpRate())
    this.changeExp(newExp, this.shouldDisplayLevelUp())
}

Game_Enemy.prototype.finalExpRate = function() {
    return this.exr * 1
}

Game_Enemy.prototype.shouldDisplayLevelUp = function() {
    return true
}

Game_Enemy.prototype.changeLevel = function(level, show) {
    level = level.clamp(1, this.maxLevel())
    this.changeExp(this.expForLevel(level), show)
}

Game_Enemy.prototype.changeClass = function(classId, keepExp) {
    if (keepExp) {
        this._exp[classId] = this.currentExp()
    }
    this._classId = classId
    this.changeExp(this._exp[this._classId] || 0, false)
    this.refresh()
}

Game_Enemy.prototype.performAttack = function() {
    const weapons = this.weapons()
    const wtypeId = weapons[0] ? weapons[0].wtypeId : 0
    const attackMotion = $dataSystem.attackMotions[wtypeId]

    if (attackMotion) {

        if (attackMotion.type === 0) {
            this.requestMotion('thrust')
        } else if (attackMotion.type === 1) {
            this.requestMotion('swing')
        } else if (attackMotion.type === 2) {
            this.requestMotion('missile')
        }
        
        this.startWeaponAnimation(attackMotion.weaponImageId)
    }
}

Alias.Game_Enemy_meetsCondition = Game_Enemy.prototype.meetsCondition
Game_Enemy.prototype.meetsCondition = function(action) {
    return Alias.Game_Enemy_meetsCondition.call(this, action) && this.meetsActionLevelCondition(action)
}

Game_Enemy.prototype.meetsActionLevelCondition = function(action){
    return this._level >= (action.requiredLevel || 0)
}

}

/* ---------------------------- WINDOW BATTLE LOG --------------------------- */
{

Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
    this.showActorAttackAnimation(subject, targets)
}

}

}