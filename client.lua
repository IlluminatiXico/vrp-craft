vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP", "vrp_inventario")

local show = false
local temp_pinventory = nil
local temp_inventory = nil
local temp_weight = nil
local temp_maxWeight = nil
local temp_iWeight = nil
local temp_iMaxWeight = nil
local cooldown = 0

function openGui(pinventory, inventory, weight, maxWeight, iWeight, iMaxWeight, dt, style)
    if show == false then
        show = true
        SetNuiFocus(true, true)
        SendNUIMessage(
            {
                show = true,
                pinventory = pinventory,
                inventory = inventory,
                p_i_weight = weight,
                p_i_maxWeight = maxWeight,
                i_weight = iWeight,
                i_maxWeight = iMaxWeight,
                dataType = dt,
                style = style
            }
        )
    end
end

function closeGui()
    show = false
    SetNuiFocus(false)
    SendNUIMessage({show = false})
end

Citizen.CreateThread(
    function()
        while true do
Citizen.Wait(0)
            SetNuiFocus(true, true)
        end
    end
)
