p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

# Add photo upload field after asset description textarea
old = """                          <textarea
                            className="control min-h-16 resize-y"
                            placeholder="Describe the condition of the asset, visible damage, sparks, etc."
                            value={assetDescription}
                            onChange={(e) => setAssetDescription(e.target.value)}
                          />
                        </div>
                      </>
                    )}"""
new = """                          <textarea
                            className="control min-h-16 resize-y"
                            placeholder="Describe the condition of the asset, visible damage, sparks, etc."
                            value={assetDescription}
                            onChange={(e) => setAssetDescription(e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    {/* Optional Photo Upload */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Upload Photo (Optional)
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="button button-secondary text-xs cursor-pointer">
                          <Icon name="plus" className="size-3.5" /> Choose Photo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                setPhotoFile(file)
                                const reader = new FileReader()
                                reader.onload = (ev) => setPhotoPreview(ev.target?.result as string)
                                reader.readAsDataURL(file)
                              }
                            }}
                          />
                        </label>
                        {photoPreview && (
                          <div className="relative">
                            <img src={photoPreview} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-line" />
                            <button
                              type="button"
                              onClick={() => { setPhotoFile(null); setPhotoPreview(null) }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                            >
                              x
                            </button>
                          </div>
                        )}
                        {photoFile && <span className="text-xs text-muted">{photoFile.name}</span>}
                      </div>
                      <p className="text-[0.7rem] text-muted mt-1">Upload a photo of the fault (max 5MB). Helps crews locate the issue.</p>
                    </div>"""
assert old in s, "pattern not found"
s = s.replace(old, new, 1)

# Update handleFormSubmit to include photo
old2 = """      assetType: assetType || undefined,
      assetNumber: assetNumber || undefined,
      assetDescription: assetDescription || undefined,
    }"""
new2 = """      assetType: assetType || undefined,
      assetNumber: assetNumber || undefined,
      assetDescription: assetDescription || undefined,
      photoUrl: photoPreview || undefined,
    }"""
assert old2 in s, "pattern2 not found"
s = s.replace(old2, new2, 1)

# Reset photo on submit
old3 = """    setAssetType('')
    setAssetNumber('')
    setAssetDescription('')
  }"""
new3 = """    setAssetType('')
    setAssetNumber('')
    setAssetDescription('')
    setPhotoFile(null)
    setPhotoPreview(null)
  }"""
assert old3 in s, "pattern3 not found"
s = s.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8').write(s)
print("done")
