import React, { useState } from 'react';
import { TextField, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery } from 'helper/useQuery';

interface TagProps {
    selectedTags: (t: string[]) => void;
    initialTags: string[];
}
interface Tag {
    id: number;
    value: string;
}

function onlyUnique(value: string, index: number, array: string[]) {
    return array.indexOf(value) === index;
}

export function InputTags(props: TagProps) {
    const [tagsSuggestion] = useQuery<Tag[]>('tags', null,[])
    const [userInputTag, setUserInputTag] = useState('');
    const { initialTags } = props;
    const [autoselectValue, setAutoselectValue] = useState<string[]>(initialTags);
    const checkExistingTags = () => {
        const unique = autoselectValue.filter(onlyUnique);
        const index = unique.indexOf('');
        if (index > -1) {
            unique.splice(index, 1);
        }
        setAutoselectValue(unique);
        props.selectedTags(unique);
    };

    const InputPersonalTags = () => {
        const userTags = userInputTag.split(' ');
        const currentTags = autoselectValue;
        userTags.forEach(usertag => currentTags.push(usertag));
        checkExistingTags();
    };

    return (
        <div className="tags-input">
            <Autocomplete
                multiple
                id="tags-standard"
                options={tagsSuggestion.map(tag => tag.value)}
                freeSolo
                value={autoselectValue}
                inputValue={userInputTag}
                onInputChange={(event, value) => {
                    setUserInputTag(value);
                    if (value.includes(' ')) {
                        InputPersonalTags();
                    }
                }}
                onChange={(event, value) => {
                    const newValue = value.map(tag => tag.trim()).filter(element => element !== '');
                    event.preventDefault();
                    setAutoselectValue([...newValue]);
                    props.selectedTags([...newValue]);
                }}
                onBlur={InputPersonalTags}
                renderTags={(value, getTagProps) =>
                    value.map((tag, index) => <Chip variant="outlined" label={tag} {...getTagProps({ index })} />)
                }
                renderInput={params => (
                    <TextField {...params} style={{
                        minWidth: 500,
                        alignSelf: 'center',
                    }}
                     label="Тагове" fullWidth />
                )}
            />
        </div>
    );
}
