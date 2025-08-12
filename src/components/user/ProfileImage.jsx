import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiEdit } from 'react-icons/fi'
import { editUserProfile, getUserDataFirst } from '../../redux/actions/userActions'
import { CloudinaryURL } from '../../Common/api'
import { pr1 } from '../../assets'

const ProfileImage = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            updateProfileImage(file)
        }
    }

    const updateProfileImage = async(file) => {
        const formData = new FormData()
        formData.append('profileImgURL', file)
        await dispatch(editUserProfile(formData))
        dispatch(getUserDataFirst()) // Refresh user data after updating profile image
    }

    const getProfileImage = () => {
        if (selectedFile) {
            return URL.createObjectURL(selectedFile)
        }
        if (user.profileImgURL || user.profileImageURL) {
            return (user.profileImgURL || user.profileImageURL).startsWith('https')
                ? user.profileImgURL || user.profileImageURL
                : `${CloudinaryURL}/${user.profileImgURL || user.profileImageURL}`
        }
        return pr1 // Your default image
    }

    return (
        <div className="bg-gradient-to-r from-mainclr to-mainhvr px-6 py-8 text-center">
            <div className="relative mx-auto w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg">
                <img
                    src={getProfileImage()}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-mainclr text-white rounded-full p-2 hover:bg-mainhvr transition-colors cursor-pointer">
                    <FiEdit size={16} />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
            </div>
            <h1 className="mt-4 text-2xl font-medium text-white">
                {user.name}
            </h1>
        </div>
    )
}

export default ProfileImage